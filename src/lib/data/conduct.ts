export interface ConductSection {
  id: string;
  title: string;
  rules: readonly string[];
}

export const conductSections: readonly ConductSection[] = [
  {
    id: 'player-code',
    title: 'Player Code of Conduct',
    rules: [
      'Play hard, play fair, and always respect the game.',
      'Show respect to coaches, teammates, opponents, and umpires at all times.',
      'Attend all practices and games on time. Communicate absences to your coach in advance.',
      'Take care of your uniform and equipment. Represent the Bombers with pride.',
      'Accept coaching and constructive criticism with a positive attitude.',
      'Support your teammates and celebrate their successes.',
      'Win with humility and lose with grace. Learn from every game.',
    ],
  },
  {
    id: 'parent-code',
    title: 'Parent Code of Conduct',
    rules: [
      'Encourage your child to play by the rules and resolve conflicts without confrontation.',
      'Remember that youth sports are for the players, not the parents. Let them play.',
      'Show respect for coaches, umpires, and opposing teams. Model good sportsmanship.',
      'Refrain from coaching your child or other players from the sidelines during games.',
      'Keep sideline comments positive and supportive. Avoid criticizing players, coaches, or officials.',
      'Respect the coaches\' decisions regarding playing time, positions, and team strategy.',
      'Communicate concerns to coaches privately and respectfully, not during games or in front of players.',
    ],
  },
  {
    id: 'coach-code',
    title: 'Coach Code of Conduct',
    rules: [
      'Prioritize player development, safety, and enjoyment over winning.',
      'Treat all players fairly and provide appropriate playing time for skill development.',
      'Teach and model respect, sportsmanship, and integrity on and off the field.',
      'Communicate clearly and positively with players and parents about expectations and concerns.',
      'Never use physical punishment or verbally abusive language.',
      'Maintain appropriate boundaries and follow all organization safety policies.',
      'Continue to develop your coaching skills and knowledge of the game.',
    ],
  },
  {
    id: 'spectator-expectations',
    title: 'Spectator Expectations',
    rules: [
      'Cheer for good plays by both teams. Youth baseball is about learning and development.',
      'Respect the umpires\' decisions. They are doing their best and are part of the learning environment.',
      'Stay in designated spectator areas. Do not enter the field or dugout areas.',
      'Keep the field and surrounding areas clean. Dispose of trash properly.',
      'Create a positive, family-friendly atmosphere at all games.',
      'Report concerns about conduct or safety to organization leadership, not field staff.',
    ],
  },
];
