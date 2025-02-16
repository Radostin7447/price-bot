require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('/calculate')) {
        const args = message.content.split(' ').slice(1);
        
        if (args.length < 3) {
            return message.reply('❌ Формат: `/calculate <ядра> <RAM> <SSD>`');
        }
        
        const cpu = parseFloat(args[0]);
        const ram = parseFloat(args[1]);
        const ssd = parseFloat(args[2]);
        
        if (isNaN(cpu) || isNaN(ram) || isNaN(ssd)) {
            return message.reply('❌ Моля, въведете валидни числа!');
        }
        
        const totalCost = cpu * 8.50 + (ram / 2) * 4.50 + (ssd / 10) * 2.00;
        message.reply(`💰 Обща цена: **${totalCost.toFixed(2)} лв.**`);
    }
});

client.login(process.env.TOKEN);
