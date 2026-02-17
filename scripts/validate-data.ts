#!/usr/bin/env node
/**
 * Data Validation Script
 *
 * Validates all JSON data files against their Zod schemas.
 * Used locally and in CI to catch content errors before deployment.
 *
 * Exit codes:
 *   0 = All validations passed
 *   1 = One or more validations failed
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  TeamsDataSchema,
  FeesDataSchema,
  OrganizationDataSchema,
  SponsorsDataSchema,
  HomeDataSchema,
  SpiritWearDataSchema,
  ContactDataSchema,
  ConductDataSchema,
} from '../src/lib/schemas/index.js';

import { ZodError } from 'zod';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load JSON file from disk
 */
function loadJSON(filename: string): unknown {
  const filePath = join(__dirname, '../src/lib/data', filename);
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Validate a single data file against its schema
 */
function validateFile(
  filename: string,
  schema: any,
  data: unknown
): boolean {
  try {
    schema.parse(data);
    console.log(`  ✓ [PASS] ${filename}`);
    return true;
  } catch (error) {
    console.log(`  ✗ [FAIL] ${filename}`);

    if (error instanceof ZodError) {
      error.issues.forEach((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
        console.log(`    Path: ${path} - ${issue.message}`);
      });
    } else {
      console.log(`    Unexpected error: ${error}`);
    }

    return false;
  }
}

/**
 * Main validation runner
 */
function main() {
  console.log('\n🔍 Validating data files against Zod schemas...\n');

  const validations = [
    { filename: 'teams.json', schema: TeamsDataSchema },
    { filename: 'fees.json', schema: FeesDataSchema },
    { filename: 'organization.json', schema: OrganizationDataSchema },
    { filename: 'sponsors.json', schema: SponsorsDataSchema },
    { filename: 'home.json', schema: HomeDataSchema },
    { filename: 'spirit-wear.json', schema: SpiritWearDataSchema },
    { filename: 'contact.json', schema: ContactDataSchema },
    { filename: 'conduct.json', schema: ConductDataSchema },
  ];

  const results = validations.map((v) => {
    const data = loadJSON(v.filename);
    return validateFile(v.filename, v.schema, data);
  });

  const passCount = results.filter(r => r).length;
  const failCount = results.length - passCount;

  console.log('\n' + '─'.repeat(50));
  console.log(`📊 Results: ${passCount} passed, ${failCount} failed`);
  console.log('─'.repeat(50) + '\n');

  if (failCount > 0) {
    console.error('❌ Validation failed. Please fix the errors above.\n');
    process.exit(1);
  } else {
    console.log('✅ All data files are valid!\n');
    process.exit(0);
  }
}

main();
