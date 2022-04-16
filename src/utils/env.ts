import "dotenv/config";

const env = {
  token: process.env.DISCORD_TOKEN || "",
  clientId: process.env.CLIENT_ID || "",
  guildId: process.env.GUILD_ID || "",
  catToken: process.env.CAT_API_TOKEN || "",
};

export default env;
