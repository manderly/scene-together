/* Small "service" for returning popular actor and film pairs */

const popularActorPairs = [
	{name1: "Tom Hanks", name2: "Meg Ryan"},
	{name1: "Emma Stone", name2: "Ryan Gosling"},
	{name1: "Bradley Cooper", name2: "Jennifer Lawrence"},
	{name1: "Jon Favreau", name2: "Vince Vaughn"},
	{name1: "Nick Frost", name2: "Simon Pegg"},
	{name1: "Helena Bonham Carter", name2: "Johnny Depp"},
	{name1: "Angelina Jolie", name2: "Brad Pitt"},
	{name1: "David Tennant", name2: "Olivia Colman"},
	{name1: "Kate Winslet", name2: "Leonardo DiCaprio"},
	{name1: "Julia Roberts", name2: "Richard Gere"},
	{name1: "Ben Affleck", name2: "Matt Damon"},
	{name1: "Ben Stiller", name2: "Owen Wilson"},
	{name1: "James Franco", name2: "Seth Rogen"},
	{name1: "Adam Sandler", name2: "Rob Schneider"},
];

const popularShowPairs = [
  {name1: 'Breaking Bad', name2: 'Malcom in the Middle'},
  {name1: 'John Wick', name2: 'The Matrix'},
	{name1: 'The Lord of the Rings', name2: 'Lost'},
	{name1: 'Harry Potter', name2: 'Games of Thrones'},
	{name1: 'You\'ve Got Mail', name2: 'Sleepless in Seattle'}
];

export const chooseExampleActorPair = () => {
  return popularActorPairs[Math.floor(Math.random()*popularActorPairs.length)];
};

export const chooseExampleShowPair = () => {
  return popularShowPairs[Math.floor(Math.random()*popularShowPairs.length)];
};