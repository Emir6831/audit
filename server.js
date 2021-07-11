const { Client, MessageEmbed } = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
const ayar = require('./config');

client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'Ferzah', type: 'WATCHING' }, status: 'idle' });
    let kanal = client.channels.cache.get('853385028243423245');
    if (kanal) kanal.join().catch(s => console.log('Kanala Bağlanamadım!'));
});

client.on('channelCreate', async (channel) => {
    let guild = client.guilds.cache.get(ayar.guildID);
    let entry = await guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' });
    let executor = entry.entries.first().executor;
    let log = guild.channels.cache.get(ayar.logChannel);
    if (executor.bot || !entry) return;
    if (log) {
        log.send(new MessageEmbed().setDescription(`
       \` ${channel.name} (${channel.type}) \` adlı kanalı oluşturdu. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
    }
});

client.on('channelDelete', async (channel) => {
    let guild = client.guilds.cache.get(ayar.guildID);
    let entry = await guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
    let executor = entry.entries.first().executor;
    let log = guild.channels.cache.get(ayar.logChannel);
    if (executor.bot || !entry) return;
    if (log) {
        log.send(new MessageEmbed().setDescription(`
        \` ${channel.name} (${channel.type}) \` adlı kanalı sildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
    }
});

client.on('channelUpdate', async (old, nev) => {
    let guild = client.guilds.cache.get(ayar.guildID);
    let entry = await guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
    let executor = entry.entries.first().executor;
    let log = guild.channels.cache.get(ayar.logChannel);
    if (executor.bot || !entry) return;
    if (log) {
        if (old.name !== nev.name) {
            log.send(new MessageEmbed().setDescription(`
            \` ${old.name} \` adlı kanalın ismini \` ${nev.name} \` olarak güncelledi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.rawPosition !== nev.rawPosition) {
            log.send(new MessageEmbed().setDescription(`
            \` ${old.name} \` adlı kanalın yeri değiştirildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.parentID !== nev.parentID) {
            log.send(new MessageEmbed().setDescription(`
            \` ${old.name} \` adlı kanal ${nev.parentID !== null ? '\` ' + guild.channels.cache.get(nev.parentID).name + ' \` adlı kategoriye taşındı' : '\` Kategorisiz \` yere taşındı'}. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.rateLimitPerUser !== nev.rateLimitPerUser) {
            log.send(new MessageEmbed().setDescription(`
            \` ${old.name} \` adlı kanalın yazma hızı limiti \` ${nev.rateLimitPerUser}sn \` olarak değiştirildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.nsfw !== nev.nsfw) {
            log.send(new MessageEmbed().setDescription(`
            \` ${old.name} \` adlı kanalın nsfw ayarı ${nev.nsfw == true ? 'açıldı' : 'kapatıldı'}. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.topic !== nev.topic) {
            log.send(new MessageEmbed().setDescription(`
            \` ${old.name} \` adlı kanalın açıklaması değiştirildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        }
    }
});

client.on('roleCreate', async (role) => {
    let guild = client.guilds.cache.get(ayar.guildID);
    let entry = await guild.fetchAuditLogs({ type: 'ROLE_CREATE' });
    let executor = entry.entries.first().executor;
    let log = guild.channels.cache.get(ayar.logChannel);
    if (executor.bot || !entry) return;
    if (log) {
        log.send(new MessageEmbed().setDescription(`
        \` ${role.name} (${role.id}) \` adlı rolü oluşturdu. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
    }
});

client.on('roleDelete', async (role) => {
    let guild = client.guilds.cache.get(ayar.guildID);
    let entry = await guild.fetchAuditLogs({ type: 'ROLE_CREATE' });
    let executor = entry.entries.first().executor;
    let log = guild.channels.cache.get(ayar.logChannel);
    if (executor.bot || !entry) return;
    if (log) {
        log.send(new MessageEmbed().setDescription(`
        \` ${role.name} (${role.id}) \` adlı rolü sildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
    }
});

client.on('roleUpdate', async (old, nev) => {
    let guild = client.guilds.cache.get(ayar.guildID);
    let entry = await guild.fetchAuditLogs({ type: 'ROLE_CREATE' });
    let executor = entry.entries.first().executor;
    let log = guild.channels.cache.get(ayar.logChannel);
    if (executor.bot || !entry) return;
    console.log(old)
    if (log) {
        if (old.name !== nev.name) {
            log.send(new MessageEmbed().setDescription(`
        \` ${old.name} (${old.id}) \` adlı rolün ismi \` ${nev.name} \` olarak değiştirildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.color !== nev.color) {
            log.send(new MessageEmbed().setDescription(`
        \` ${old.name} (${old.id}) \` adlı rolün rengi değiştirildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.permissions !== nev.permissions) {
            log.send(new MessageEmbed().setDescription(`
        \` ${old.name} (${old.id}) \` adlı rolün izinleri değiştirildi kontrol ediniz! 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        } else if (old.rawPosition !== nev.rawPosition) {
            log.send(new MessageEmbed().setDescription(`
        \` ${old.name} (${old.id}) \` adlı rolün yeri değiştirildi. 
        `).setAuthor(executor.username, executor.avatarURL({ dynamic: true })).setFooter(`Yapan ID: ${executor.id}`))
        }
    }
});

client.login('ODUzMzgzOTU1OTA2NTYwMDQw.YMUlvg.IcTzH28Bp5QeHGOMLBqff23XhLk').then(s => console.log(client.user.username)).catch(s => console.log('Bota bağlanılamadı!'));