export interface Player {
  name: string;
  jerseyNumber: number;
}

export interface Coach {
  name: string;
  role: 'Head Coach' | 'Assistant Coach';
  photoUrl: string;
  bio?: string;
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
        bio: 'Coach Adams has been coaching youth baseball for 8 years and focuses on building fundamental skills in a fun, supportive environment. He believes in developing well-rounded players who love the game.',
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
        bio: 'Coach Miller brings 5 years of coaching experience with a focus on teamwork and sportsmanship. She emphasizes creating a positive learning environment where every player feels valued and encouraged to improve.',
      },
      {
        name: 'Tom Wilson',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
        bio: 'Coach Wilson specializes in defensive fundamentals and has helped develop players at the youth level for over 6 years.',
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
        bio: 'Coach Johnson has been coaching for over 10 years with a passion for teaching proper hitting and base running techniques. His teams are known for their discipline and competitive spirit on the field.',
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
        bio: 'Coach Cook brings 12 years of youth baseball coaching experience with a focus on developing pitching and defensive skills. He believes in teaching the mental side of the game alongside physical fundamentals.',
      },
      {
        name: 'Jennifer Bailey',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
        bio: 'Coach Bailey has coached youth baseball for 4 years and specializes in building player confidence and positive team culture.',
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
        bio: 'Coach Smith has been involved in youth baseball for 7 years and emphasizes fundamentals, teamwork, and having fun. He focuses on creating an inclusive environment where every player can thrive.',
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
        bio: 'Coach Martinez has over 15 years of baseball coaching experience at multiple levels. He focuses on advanced skill development and preparing players for competitive play while maintaining a positive, growth-oriented environment.',
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
        bio: 'Coach Rodriguez has coached youth baseball for 9 years with a focus on player development and competitive excellence. He emphasizes discipline, teamwork, and building character through sports.',
      },
      {
        name: 'Maria Rodriguez',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
        bio: 'Coach Rodriguez brings 6 years of coaching experience with expertise in base running and offensive strategies.',
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
        bio: 'Coach Patterson has been coaching competitive youth baseball for 11 years. He specializes in developing pitchers and catchers while emphasizing the importance of mental toughness and game preparation.',
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
        bio: 'Coach Williams brings 13 years of coaching experience with a strong focus on advanced hitting mechanics and situational baseball. He is committed to preparing players for high school baseball and beyond.',
      },
      {
        name: 'Lisa Anderson',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
        bio: 'Coach Anderson has 5 years of experience coaching youth baseball with a specialty in outfield play and team communication.',
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
  // 15U Division
  {
    id: '15u-thompson',
    name: '15U Thompson',
    ageGroup: '15U',
    headCoachName: 'Michael Thompson',
    season: currentSeason,
    coaches: [
      {
        name: 'Michael Thompson',
        role: 'Head Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
        bio: 'Coach Thompson has over 14 years of coaching experience at competitive levels, with a focus on advanced strategy and preparing players for high school varsity baseball. He emphasizes leadership development both on and off the field.',
      },
      {
        name: 'Steve Jenkins',
        role: 'Assistant Coach',
        photoUrl: '/images/coaches/placeholder.jpg',
        bio: 'Coach Jenkins brings 8 years of experience with a specialty in pitching development and bullpen management.',
      },
    ],
    players: [
      { name: 'Andrew Martinez', jerseyNumber: 1 },
      { name: 'Brandon Cole', jerseyNumber: 7 },
      { name: 'Connor Hughes', jerseyNumber: 12 },
      { name: 'Dylan Brooks', jerseyNumber: 17 },
      { name: 'Evan Price', jerseyNumber: 22 },
      { name: 'Frank Myers', jerseyNumber: 5 },
      { name: 'Gabriel Long', jerseyNumber: 10 },
      { name: 'Henry Foster', jerseyNumber: 15 },
      { name: 'Isaac Bell', jerseyNumber: 20 },
      { name: 'Jacob Coleman', jerseyNumber: 25 },
    ],
  },
];
