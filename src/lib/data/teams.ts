export interface Player {
  name: string;
  jerseyNumber: number;
}

export interface Coach {
  name: string;
  role: 'Head Coach' | 'Assistant Coach';
  photoUrl: string;
}

export interface Team {
  id: string;
  name: string;
  ageGroup: string;
  headCoachName: string;
  season: string;
  players: Player[];
  coaches: Coach[];
  teamPhotoUrl?: string;
}

export const currentSeason = 'Spring 2026';

export const teams: Team[] = [
  // 7U Division
  {
    id: '7u-adams',
    name: '7U Adams',
    ageGroup: '7U',
    headCoachName: 'Mike Adams',
    season: currentSeason,
    coaches: [
      {
        name: 'Mike Adams',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Tyler Bennett', jerseyNumber: 5 },
      { name: 'Mason Carter', jerseyNumber: 8 },
      { name: 'Ethan Davis', jerseyNumber: 12 },
      { name: 'Lucas Evans', jerseyNumber: 3 },
      { name: 'Noah Foster', jerseyNumber: 7 },
      { name: 'Liam Garcia', jerseyNumber: 15 },
      { name: 'Oliver Harris', jerseyNumber: 9 },
      { name: 'James Irving', jerseyNumber: 22 },
    ],
    teamPhotoUrl: '/images/teams/7u-adams.jpg',
  },
  {
    id: '7u-miller',
    name: '7U Miller',
    ageGroup: '7U',
    headCoachName: 'Sarah Miller',
    season: currentSeason,
    coaches: [
      {
        name: 'Sarah Miller',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
      {
        name: 'Tom Wilson',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Jackson Brown', jerseyNumber: 4 },
      { name: 'Aiden Clark', jerseyNumber: 11 },
      { name: 'Caleb Davis', jerseyNumber: 18 },
      { name: 'Ryan Edwards', jerseyNumber: 6 },
      { name: 'Dylan Fisher', jerseyNumber: 14 },
      { name: 'Carter Green', jerseyNumber: 21 },
      { name: 'Owen Hall', jerseyNumber: 10 },
      { name: 'Connor Jenkins', jerseyNumber: 2 },
      { name: 'Luke Martin', jerseyNumber: 16 },
    ],
  },
  // 9U Division
  {
    id: '9u-johnson',
    name: '9U Johnson',
    ageGroup: '9U',
    headCoachName: 'Chris Johnson',
    season: currentSeason,
    coaches: [
      {
        name: 'Chris Johnson',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Brandon Lee', jerseyNumber: 1 },
      { name: 'Daniel Lopez', jerseyNumber: 13 },
      { name: 'Matthew Moore', jerseyNumber: 17 },
      { name: 'Andrew Nelson', jerseyNumber: 19 },
      { name: 'Jacob Parker', jerseyNumber: 23 },
      { name: 'Samuel Reed', jerseyNumber: 8 },
      { name: 'David Scott', jerseyNumber: 12 },
      { name: 'Alexander Taylor', jerseyNumber: 24 },
      { name: 'Benjamin Thomas', jerseyNumber: 5 },
      { name: 'Henry Turner', jerseyNumber: 9 },
    ],
    teamPhotoUrl: '/images/teams/9u-johnson.jpg',
  },
  // 10U Division
  {
    id: '10u-cook',
    name: '10U Cook',
    ageGroup: '10U',
    headCoachName: 'Mark Cook',
    season: currentSeason,
    coaches: [
      {
        name: 'Mark Cook',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
      {
        name: 'Jennifer Bailey',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Isaac Walker', jerseyNumber: 3 },
      { name: 'Gabriel White', jerseyNumber: 7 },
      { name: 'Julian Wright', jerseyNumber: 11 },
      { name: 'Nathan Young', jerseyNumber: 15 },
      { name: 'Christian Allen', jerseyNumber: 20 },
      { name: 'Adam Anderson', jerseyNumber: 25 },
      { name: 'Elijah Baker', jerseyNumber: 4 },
      { name: 'Joshua Campbell', jerseyNumber: 14 },
      { name: 'Aaron Collins', jerseyNumber: 18 },
      { name: 'Austin Cooper', jerseyNumber: 27 },
    ],
  },
  {
    id: '10u-smith',
    name: '10U Smith',
    ageGroup: '10U',
    headCoachName: 'Brian Smith',
    season: currentSeason,
    coaches: [
      {
        name: 'Brian Smith',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Justin Cox', jerseyNumber: 6 },
      { name: 'Kevin Edwards', jerseyNumber: 10 },
      { name: 'Logan Evans', jerseyNumber: 13 },
      { name: 'Tyler Foster', jerseyNumber: 16 },
      { name: 'Cameron Gray', jerseyNumber: 21 },
      { name: 'Hunter Green', jerseyNumber: 26 },
      { name: 'Jordan Harris', jerseyNumber: 2 },
      { name: 'Blake Hill', jerseyNumber: 8 },
      { name: 'Chase Howard', jerseyNumber: 12 },
    ],
    teamPhotoUrl: '/images/teams/10u-smith.jpg',
  },
  // 12U Division
  {
    id: '12u-martinez',
    name: '12U Martinez',
    ageGroup: '12U',
    headCoachName: 'Roberto Martinez',
    season: currentSeason,
    coaches: [
      {
        name: 'Roberto Martinez',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Cole Jackson', jerseyNumber: 5 },
      { name: 'Derek James', jerseyNumber: 9 },
      { name: 'Eric Johnson', jerseyNumber: 14 },
      { name: 'Frank Jones', jerseyNumber: 19 },
      { name: 'Grant King', jerseyNumber: 22 },
      { name: 'Ian Lewis', jerseyNumber: 28 },
      { name: 'Jason Martin', jerseyNumber: 1 },
      { name: 'Kyle Mitchell', jerseyNumber: 7 },
      { name: 'Marcus Moore', jerseyNumber: 11 },
      { name: 'Noah Murphy', jerseyNumber: 17 },
      { name: 'Oscar Nelson', jerseyNumber: 23 },
    ],
  },
  {
    id: '12u-rodriguez',
    name: '12U Rodriguez',
    ageGroup: '12U',
    headCoachName: 'Carlos Rodriguez',
    season: currentSeason,
    coaches: [
      {
        name: 'Carlos Rodriguez',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
      {
        name: 'Maria Rodriguez',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [], // Empty roster for testing empty state
  },
  // 14U Division
  {
    id: '14u-patterson',
    name: '14U Patterson',
    ageGroup: '14U',
    headCoachName: 'Jeff Patterson',
    season: currentSeason,
    coaches: [
      {
        name: 'Jeff Patterson',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Patrick Owen', jerseyNumber: 4 },
      { name: 'Quinn Perez', jerseyNumber: 10 },
      { name: 'Ryan Powell', jerseyNumber: 15 },
      { name: 'Sean Reed', jerseyNumber: 20 },
      { name: 'Travis Roberts', jerseyNumber: 24 },
      { name: 'Victor Rogers', jerseyNumber: 29 },
      { name: 'William Ross', jerseyNumber: 3 },
      { name: 'Xavier Russell', jerseyNumber: 8 },
      { name: 'Zachary Sanders', jerseyNumber: 13 },
      { name: 'Adam Scott', jerseyNumber: 18 },
    ],
    teamPhotoUrl: '/images/teams/14u-patterson.jpg',
  },
  {
    id: '14u-williams',
    name: '14U Williams',
    ageGroup: '14U',
    headCoachName: 'David Williams',
    season: currentSeason,
    coaches: [
      {
        name: 'David Williams',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
      {
        name: 'Lisa Anderson',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
      },
    ],
    players: [
      { name: 'Brandon Shaw', jerseyNumber: 6 },
      { name: 'Cameron Simpson', jerseyNumber: 11 },
      { name: 'Dominic Smith', jerseyNumber: 16 },
      { name: 'Evan Stewart', jerseyNumber: 21 },
      { name: 'Felix Taylor', jerseyNumber: 25 },
      { name: 'George Thomas', jerseyNumber: 2 },
      { name: 'Henry Thompson', jerseyNumber: 9 },
      { name: 'Ivan Torres', jerseyNumber: 14 },
      { name: 'Jake Turner', jerseyNumber: 19 },
      { name: 'Kevin Walker', jerseyNumber: 26 },
      { name: 'Leo Ward', jerseyNumber: 30 },
    ],
  },
];
