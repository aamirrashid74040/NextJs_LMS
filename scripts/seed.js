const { PrismaClient } = require("@prisma/client");
const { data } = require("autoprefixer");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          name: "Music",
        },
        {
          name: "Sports",
        },
        {
          name: "Computer Science",
        },
        {
          name: "Medical",
        },
        {
          name: "Tourism",
        },
        {
          name: "Accounting",
        },
      ],
    });
    console.log("Success Seeding the values");
  } catch (error) {
    console.log(
      "An error has been occured while seeding the categories",
      error.message
    );
  } finally {
    await database.$disconnect();
  }
}

main();
