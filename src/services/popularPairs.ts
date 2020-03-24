
/* Small "service" for returning popular actor and film pairs */

const popularPairs = [
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
	{name1: "Joan Cusack", name2: "John Cusack"},
	{name1: "Adam Sandler", name2: "Rob Schneider"},
];

export const chooseExampleActorPair = () => {
  return popularPairs[Math.floor(Math.random()*popularPairs.length)];
};