const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
var http = require('http');
var fs = require('fs');
const { deburr, camelCase } = require('lodash')

const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:pa="http://podcastaddict.com" xmlns:podcastRF="http://radiofrance.fr/Lancelot/Podcast#" xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0" version="2.0">
  <channel>
    <title>Oli</title>
    <link>http://www.radiofrance.fr/</link>
    <description>Découvrez la série audio France Inter : des contes pour les 5-7 ans, racontés par Delphine de Vigan, Guillaume Meurice, Alain Mabanckou, Tatiana de Rosnay, Claude Ponti… Rendez-vous sur l'application Radio France pour découvrir des milliers d'autres podcasts.</description>
    <language>fr</language>
    <copyright>Radio France</copyright>
    <lastBuildDate>Sun, 11 Feb 2024 22:21:33 +0100</lastBuildDate>
    <generator>Radio France</generator>
    <image>
      <url>https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg</url>
      <title>Oli</title>
      <link>http://www.radiofrance.fr/</link>
    </image>
    <itunes:author>France Inter</itunes:author>
    <itunes:category text="Kids &amp; Family"/>
    <itunes:explicit>no</itunes:explicit>
    <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
    <itunes:owner>
      <itunes:email>podcast@radiofrance.com</itunes:email>
      <itunes:name>Radio France</itunes:name>
    </itunes:owner>
    <itunes:subtitle>Oli</itunes:subtitle>
    <itunes:summary>Découvrez la série audio France Inter : des contes pour les 5-7 ans, racontés par Delphine de Vigan, Guillaume Meurice, Alain Mabanckou, Tatiana de Rosnay, Claude Ponti… Rendez-vous sur l'application Radio France pour découvrir des milliers d'autres podcasts.</itunes:summary>
    <itunes:new-feed-url>https://radiofrance-podcast.net/podcast09/35099478-7c72-4f9e-a6de-1b928400e9e5/rss_19721.xml</itunes:new-feed-url>
    <pa:new-feed-url>https://radiofrance-podcast.net/podcast09/d4463877-caa3-4507-9399-f5eb00fde027/rss_19721.xml</pa:new-feed-url>
    <podcastRF:originStation>1</podcastRF:originStation>
    <googleplay:block>yes</googleplay:block>
    <item>
      <title>OLI en concert : "Idriss et le secret du poulpe", par Simon Johannin</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/idriss-et-le-secret-du-poulpe-par-simon-johannin-7041786</link>
      <description>durée : 00:16:30 - Une histoire et... Oli - Pour se glisser dans la peau d’Idriss, il faut imaginer l’animation qu’offre le Vieux-Port de Marseille un jour de marché sous le regard bienveillant de Notre-Dame-de-la-Garde, et replonger dans ses souvenirs d’enfance.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/fe61467a-9e87-4de3-aa68-1f39e753cfed/19721-07.02.2024-ITEMA_23610274-2024F33264E0004-21.mp3" length="15878308" type="audio/mpeg"/>
      <guid isPermaLink="false">98dfb3cf-90a6-4405-a244-955a0ea8675e-NET_MFI_6C736049-583D-4E1A-A558-71D8386BF963</guid>
      <pubDate>Wed, 07 Feb 2024 10:03:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2024F33264E0004</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Idriss et le secret du poulpe", par Simon Johannin</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Idriss,et,le,secret,du,poulpe",,par,Simon,Johannin</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Idriss et le secret du poulpe", par Simon Johannin</itunes:subtitle>
      <itunes:summary>durée : 00:16:30 - Une histoire et... Oli - Pour se glisser dans la peau d’Idriss, il faut imaginer l’animation qu’offre le Vieux-Port de Marseille un jour de marché sous le regard bienveillant de Notre-Dame-de-la-Garde, et replonger dans ses souvenirs d’enfance.</itunes:summary>
      <itunes:duration>00:16:30</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Le Paon rose" par Kaouther Adimi</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-paon-rose-par-kaouther-adimi-6509520</link>
      <description>durée : 00:13:17 - Une histoire et... Oli - C’est dans le cadre enchanteur de la Villa Médicis, nichée sur les hauteurs de la Ville éternelle, que l’histoire envoûtante du paon rose voit le jour.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/905d972e-e2ee-4a7d-bb11-973d6eec029b/19721-07.02.2024-ITEMA_23610274-2024F33264E0003-21.mp3" length="12778571" type="audio/mpeg"/>
      <guid isPermaLink="false">3a9ff13f-853b-4974-aa3c-46ef865d1748-NET_MFI_FE196D21-008E-4E96-8739-A2948C9AE4CE</guid>
      <pubDate>Wed, 07 Feb 2024 10:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2024F33264E0003</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Le Paon rose" par Kaouther Adimi</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Le,Paon,rose",par,Kaouther,Adimi</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Le Paon rose" par Kaouther Adimi</itunes:subtitle>
      <itunes:summary>durée : 00:13:17 - Une histoire et... Oli - C’est dans le cadre enchanteur de la Villa Médicis, nichée sur les hauteurs de la Ville éternelle, que l’histoire envoûtante du paon rose voit le jour.</itunes:summary>
      <itunes:duration>00:13:17</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Au fond de l’Océan" par Adeline Dieudonné</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/au-fond-de-l-ocean-par-adeline-dieudonne-3638001</link>
      <description>durée : 00:11:35 - Une histoire et... Oli - De nouveaux contes musicaux pour Oli qui s’est échappé des ondes pour s’installer sur la scène de la Maison de la
Radio et de la Musique. Adeline Dieudonné nous invite à un moment de tendresse, de rire et d’échanges entre les enfants et les parents à l’heure d’aller se couche</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/dba784fe-35bd-41e7-aa56-a50d3296c06d/19721-07.02.2024-ITEMA_23610274-2024F33264E0002-21.mp3" length="11145070" type="audio/mpeg"/>
      <guid isPermaLink="false">9e25b25f-71d6-4000-b5c7-5efc5514f666-NET_MFI_018D38D1-A4B9-4A1C-8C6E-C011051DDDB8</guid>
      <pubDate>Wed, 07 Feb 2024 10:01:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2024F33264E0002</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Au fond de l’Océan" par Adeline Dieudonné</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Au,fond,de,l’Océan",par,Adeline,Dieudonné</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Au fond de l’Océan" par Adeline Dieudonné</itunes:subtitle>
      <itunes:summary>durée : 00:11:35 - Une histoire et... Oli - De nouveaux contes musicaux pour Oli qui s’est échappé des ondes pour s’installer sur la scène de la Maison de la
Radio et de la Musique. Adeline Dieudonné nous invite à un moment de tendresse, de rire et d’échanges entre les enfants et les parents à l’heure d’aller se couche</itunes:summary>
      <itunes:duration>00:11:35</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Les Jumellomanes" par Alex Vizorek</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-jumellomanes-par-alex-vizorek-2110438</link>
      <description>durée : 00:22:24 - Une histoire et... Oli - De nouveaux contes musicaux pour Oli qui s’est échappé des ondes pour s’installer sur la scène de la Maison de la
Radio et de la Musique. Alex Vizorek nous invite à une introduction à la musique dans le cadre familier de la maison.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/584639b3-3d09-40ac-a13e-4f5525a2d88e/19721-07.02.2024-ITEMA_23610274-2024F33264E0001-21.mp3" length="21541663" type="audio/mpeg"/>
      <guid isPermaLink="false">b9a1b913-4d9e-4cba-a379-9417bafc417b-NET_MFI_ADBA8B51-A62C-4A27-9FDB-209A1856BF98</guid>
      <pubDate>Wed, 07 Feb 2024 10:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2024F33264E0001</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Les Jumellomanes" par Alex Vizorek</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Les,Jumellomanes",par,Alex,Vizorek</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Les Jumellomanes" par Alex Vizorek</itunes:subtitle>
      <itunes:summary>durée : 00:22:24 - Une histoire et... Oli - De nouveaux contes musicaux pour Oli qui s’est échappé des ondes pour s’installer sur la scène de la Maison de la
Radio et de la Musique. Alex Vizorek nous invite à une introduction à la musique dans le cadre familier de la maison.</itunes:summary>
      <itunes:duration>00:22:24</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Les dinosaures de Noël, par Jérôme Lambert</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/jerome-lambert-les-dinosaures-de-noel-8682952</link>
      <description>durée : 00:11:07 - Une histoire et... Oli - L'auteur Jérôme Lambert raconte l'histoire des "Dinosaures de Noël". Cette histoire de Noël prend place il y a bien longtemps, au temps des dinosaures...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/fa389347-2a6c-4d51-9c4f-e991200bdf9f/19721-20.12.2023-ITEMA_23573213-2023F33264E0021-21.mp3" length="10703460" type="audio/mpeg"/>
      <guid isPermaLink="false">f9723f21-4ffd-4d03-800c-24d5ba52e456-NET_MFI_1C0F3F0E-A2CB-488F-9F08-7FB9933FECCA</guid>
      <pubDate>Wed, 20 Dec 2023 10:04:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0021</podcastRF:magnetothequeID>
      <itunes:title>Les dinosaures de Noël, par Jérôme Lambert</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>Les,dinosaures,de,Noël,,par,Jérôme,Lambert</itunes:keywords>
      <itunes:subtitle>Les dinosaures de Noël, par Jérôme Lambert</itunes:subtitle>
      <itunes:summary>durée : 00:11:07 - Une histoire et... Oli - L'auteur Jérôme Lambert raconte l'histoire des "Dinosaures de Noël". Cette histoire de Noël prend place il y a bien longtemps, au temps des dinosaures...</itunes:summary>
      <itunes:duration>00:11:07</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Esmeralda la petite ogresse, par Leonor de Recondo</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/esmeralda-la-petite-ogresse-par-leonor-de-recondo-6784381</link>
      <description>durée : 00:10:48 - Une histoire et... Oli - Il était une fois, une historie d'ogres, ou plutôt celle d'une petite ogresse en voyage. Vous n'avez jamais vu d'ogres ? C'est normal, il n'apparaissent qu'un instant, juste avant de dévorer un enfant ! Écoutez "Esmeralda la petite ogresse", une histoire qui fait peur racontée par Leonor de Recondo.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/0d4917aa-1ee8-4589-bd80-a1bb29e6388d/19721-20.12.2023-ITEMA_23573213-2023F33264E0020-21.mp3" length="10405294" type="audio/mpeg"/>
      <guid isPermaLink="false">8b967c0c-f21c-4971-af5e-cc87e09fd8c5-NET_MFI_9B4337EE-5F9D-4F5F-92E4-361AA15727C3</guid>
      <pubDate>Wed, 20 Dec 2023 10:03:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0020</podcastRF:magnetothequeID>
      <itunes:title>Esmeralda la petite ogresse, par Leonor de Recondo</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>Esmeralda,la,petite,ogresse,,par,Leonor,de,Recondo</itunes:keywords>
      <itunes:subtitle>Esmeralda la petite ogresse, par Leonor de Recondo</itunes:subtitle>
      <itunes:summary>durée : 00:10:48 - Une histoire et... Oli - Il était une fois, une historie d'ogres, ou plutôt celle d'une petite ogresse en voyage. Vous n'avez jamais vu d'ogres ? C'est normal, il n'apparaissent qu'un instant, juste avant de dévorer un enfant ! Écoutez "Esmeralda la petite ogresse", une histoire qui fait peur racontée par Leonor de Recondo.</itunes:summary>
      <itunes:duration>00:10:48</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Le Requin Joe, par Mathieu Palain</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/mathieu-palain-le-requin-joe-2836897</link>
      <description>durée : 00:11:00 - Une histoire et... Oli - Il était fois au large de l'Australie, vers la barrière de corail, un grand requin, Joe, qui s'amusait à faire peur aux poissons. Il faut dire qu'il était balaise le squale, il faut dire aussi qu'il faisait de la muscu chaque matins. Écoutez Le Requin Joe, une histoire racontée par Mathieu Palain.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a6d7fd92-82fd-4652-8c8f-9b74f8e8b362/19721-20.12.2023-ITEMA_23573213-2023F33264E0019-21.mp3" length="10584159" type="audio/mpeg"/>
      <guid isPermaLink="false">943be45c-4d4b-4dba-bdbc-904afaaf73da-NET_MFI_47EC59D8-DB5F-4430-A307-BACCE62B206E</guid>
      <pubDate>Wed, 20 Dec 2023 10:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0019</podcastRF:magnetothequeID>
      <itunes:title>Le Requin Joe, par Mathieu Palain</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>Le,Requin,Joe,,par,Mathieu,Palain</itunes:keywords>
      <itunes:subtitle>Le Requin Joe, par Mathieu Palain</itunes:subtitle>
      <itunes:summary>durée : 00:11:00 - Une histoire et... Oli - Il était fois au large de l'Australie, vers la barrière de corail, un grand requin, Joe, qui s'amusait à faire peur aux poissons. Il faut dire qu'il était balaise le squale, il faut dire aussi qu'il faisait de la muscu chaque matins. Écoutez Le Requin Joe, une histoire racontée par Mathieu Palain.</itunes:summary>
      <itunes:duration>00:11:00</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>La princesse qui tombait amoureuse tout le temps, par Maud Ventura.</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/maud-ventura-la-princesse-qui-tombait-amoureuse-tout-le-temps-9846259</link>
      <description>durée : 00:12:18 - Une histoire et... Oli - Il était une fois l'histoire d'une jeune princesse qui se posait des questions sur le prince charmant. Le problème est qu'elle trouvait tous les princes très charmants, et parfois les princesses. Écoutez Maud Ventura raconter l'histoire de "La princesse qui tombait amoureuse tout le temps".</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/d091a67f-17ce-4458-94a3-61b6f5e11331/19721-20.12.2023-ITEMA_23573213-2023F33264E0018-21.mp3" length="11832205" type="audio/mpeg"/>
      <guid isPermaLink="false">4b230421-737d-4182-94b4-ef2a359bac9d-NET_MFI_C01F3D19-A703-4258-8BC0-2080F6C1400D</guid>
      <pubDate>Wed, 20 Dec 2023 10:01:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0018</podcastRF:magnetothequeID>
      <itunes:title>La princesse qui tombait amoureuse tout le temps, par Maud Ventura.</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>La,princesse,qui,tombait,amoureuse,tout,le,temps,,par,Maud,Ventura.</itunes:keywords>
      <itunes:subtitle>La princesse qui tombait amoureuse tout le temps, par Maud Ventura.</itunes:subtitle>
      <itunes:summary>durée : 00:12:18 - Une histoire et... Oli - Il était une fois l'histoire d'une jeune princesse qui se posait des questions sur le prince charmant. Le problème est qu'elle trouvait tous les princes très charmants, et parfois les princesses. Écoutez Maud Ventura raconter l'histoire de "La princesse qui tombait amoureuse tout le temps".</itunes:summary>
      <itunes:duration>00:12:18</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Le chevalier à l'épée en chocolat, par Mathilde Serrell</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/mathilde-serrell-le-chevalier-a-l-epee-en-chocolat-2687414</link>
      <description>durée : 00:08:38 - Une histoire et... Oli - Mathilde Serrell raconte l'histoire du "Chevalier à l'épée en chocolat", une histoire avec des dragons, des dragonnes, des paillettes, du feu.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/abe89ce3-acfa-432f-81af-0abcaeafc2cb/19721-20.12.2023-ITEMA_23573213-2023F33264E0017-21.mp3" length="8321098" type="audio/mpeg"/>
      <guid isPermaLink="false">73e23181-598e-4a7d-b003-e6279c328db7-NET_MFI_FEA8DE02-36B4-49E0-A503-B74149338ECD</guid>
      <pubDate>Wed, 20 Dec 2023 10:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0017</podcastRF:magnetothequeID>
      <itunes:title>Le chevalier à l'épée en chocolat, par Mathilde Serrell</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>Le,chevalier,à,l'épée,en,chocolat,,par,Mathilde,Serrell</itunes:keywords>
      <itunes:subtitle>Le chevalier à l'épée en chocolat, par Mathilde Serrell</itunes:subtitle>
      <itunes:summary>durée : 00:08:38 - Une histoire et... Oli - Mathilde Serrell raconte l'histoire du "Chevalier à l'épée en chocolat", une histoire avec des dragons, des dragonnes, des paillettes, du feu.</itunes:summary>
      <itunes:duration>00:08:38</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le petit cheval ailé"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/jerome-garcin-le-petit-cheval-aile-8063204</link>
      <description>durée : 00:11:42 - Une histoire et... Oli - Jérôme Garcin écrit depuis toujours, c'est un éternel amoureux des chevaux, alors quoi de plus naturel pour lui que d'imaginer et de raconter pour Oli, une belle histoire celle d'une reine et d'un roi.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/694760a6-3461-4fa2-bd1f-8418caeef17f/19721-18.10.2023-ITEMA_23521526-2023F33264E0012-21.mp3" length="11256062" type="audio/mpeg"/>
      <guid isPermaLink="false">8d235570-e2be-4bad-aa8a-f521d9764a74-NET_MFI_D1D44EA0-7C0E-4D0C-8C35-BD4F5CE63A75</guid>
      <pubDate>Wed, 18 Oct 2023 09:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0012</podcastRF:magnetothequeID>
      <itunes:title>"Le petit cheval ailé"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,petit,cheval,ailé"</itunes:keywords>
      <itunes:subtitle>"Le petit cheval ailé"</itunes:subtitle>
      <itunes:summary>durée : 00:11:42 - Une histoire et... Oli - Jérôme Garcin écrit depuis toujours, c'est un éternel amoureux des chevaux, alors quoi de plus naturel pour lui que d'imaginer et de raconter pour Oli, une belle histoire celle d'une reine et d'un roi.</itunes:summary>
      <itunes:duration>00:11:42</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le croissant de nuit"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/lucie-rico-le-croissant-de-nuit-8201851</link>
      <description>durée : 00:10:29 - Une histoire et... Oli - Voici une histoire parfaite pour développer l'imagination et la créativité de votre enfant, même si il en a déjà beaucoup. Celle de Lucie Rico, pour Oli, les emmène dans un monde féérique, celui qui rappellera votre enfance.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/94d14cba-d16c-4035-bded-6c4b2868d59d/19721-18.10.2023-ITEMA_23521526-2023F33264E0013-21.mp3" length="10094570" type="audio/mpeg"/>
      <guid isPermaLink="false">7a36e682-477d-461c-bafa-e60f771f0526-NET_MFI_6DC95F3B-7266-41DF-804A-3E6FC063CF22</guid>
      <pubDate>Wed, 18 Oct 2023 09:03:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0013</podcastRF:magnetothequeID>
      <itunes:title>"Le croissant de nuit"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,croissant,de,nuit"</itunes:keywords>
      <itunes:subtitle>"Le croissant de nuit"</itunes:subtitle>
      <itunes:summary>durée : 00:10:29 - Une histoire et... Oli - Voici une histoire parfaite pour développer l'imagination et la créativité de votre enfant, même si il en a déjà beaucoup. Celle de Lucie Rico, pour Oli, les emmène dans un monde féérique, celui qui rappellera votre enfance.</itunes:summary>
      <itunes:duration>00:10:29</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les mots du soir "</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/etienne-kern-les-mots-du-soir-6057550</link>
      <description>durée : 00:11:28 - Une histoire et... Oli - Les histoires, c'est bon pour les enfants ! D'ailleurs, ils adorent qu'on leur en lise, en plus grâce à Étienne Kern, on y apprend pleins de nouveaux mots rien que pour Oli.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/6452e33e-fb73-4695-8a00-d67f5cadae45/19721-18.10.2023-ITEMA_23521526-2023F33264E0014-21.mp3" length="11032783" type="audio/mpeg"/>
      <guid isPermaLink="false">b6ec6230-8fae-4c5e-a8f3-5a6959741155-NET_MFI_59DA0AC0-79B0-4DDA-853F-F26C91C09A2C</guid>
      <pubDate>Wed, 18 Oct 2023 09:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0014</podcastRF:magnetothequeID>
      <itunes:title>"Les mots du soir "</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,mots,du,soir,"</itunes:keywords>
      <itunes:subtitle>"Les mots du soir "</itunes:subtitle>
      <itunes:summary>durée : 00:11:28 - Une histoire et... Oli - Les histoires, c'est bon pour les enfants ! D'ailleurs, ils adorent qu'on leur en lise, en plus grâce à Étienne Kern, on y apprend pleins de nouveaux mots rien que pour Oli.</itunes:summary>
      <itunes:duration>00:11:28</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Genialstein", par Anne Akrich</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/anna-akrich-genialstein-7117521</link>
      <description>durée : 00:09:00 - Une histoire et... Oli - En écoutant des histoires, grâce à la voix et la musique, l'enfant développe son imagination comme celle d'Anne Akrich, toute rigolote qui, pour Oli, a aussi pensé à certaines mamans.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/def321bb-1dca-42ce-9aac-507f4c629138/19721-18.10.2023-ITEMA_23521526-2023F33264E0015-21.mp3" length="8664225" type="audio/mpeg"/>
      <guid isPermaLink="false">3c639339-39d6-437b-91fd-fd1a7e7c4458-NET_MFI_0201D6A2-334E-4749-BB63-A137347AC1B1</guid>
      <pubDate>Wed, 18 Oct 2023 09:01:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0015</podcastRF:magnetothequeID>
      <itunes:title>"Genialstein", par Anne Akrich</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Genialstein",,par,Anne,Akrich</itunes:keywords>
      <itunes:subtitle>"Genialstein", par Anne Akrich</itunes:subtitle>
      <itunes:summary>durée : 00:09:00 - Une histoire et... Oli - En écoutant des histoires, grâce à la voix et la musique, l'enfant développe son imagination comme celle d'Anne Akrich, toute rigolote qui, pour Oli, a aussi pensé à certaines mamans.</itunes:summary>
      <itunes:duration>00:09:00</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le sourire sérieux" par Philippe Torreton</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/philippe-torreton-le-sourire-serieux-3850843</link>
      <description>durée : 00:10:54 - Une histoire et... Oli - C'est grâce à son enfance passée dans la campagne de Normandie que Philippe Torreton a pu comprendre les grands textes de la littérature. Pour Oli, il raconte une histoire au titre bien mystérieux et qui va ravir votre enfant.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/0f091fd3-4c7e-4fcc-ad08-d40209ed62d6/19721-18.10.2023-ITEMA_23521526-2023F33264E0016-21.mp3" length="10499597" type="audio/mpeg"/>
      <guid isPermaLink="false">cc751961-ca99-4844-b072-bf46442cc767-NET_MFI_B1705774-2AB9-434C-94ED-1938BA93FB59</guid>
      <pubDate>Wed, 18 Oct 2023 09:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0016</podcastRF:magnetothequeID>
      <itunes:title>"Le sourire sérieux" par Philippe Torreton</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,sourire,sérieux",par,Philippe,Torreton</itunes:keywords>
      <itunes:subtitle>"Le sourire sérieux" par Philippe Torreton</itunes:subtitle>
      <itunes:summary>durée : 00:10:54 - Une histoire et... Oli - C'est grâce à son enfance passée dans la campagne de Normandie que Philippe Torreton a pu comprendre les grands textes de la littérature. Pour Oli, il raconte une histoire au titre bien mystérieux et qui va ravir votre enfant.</itunes:summary>
      <itunes:duration>00:10:54</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>L'histoire du rêve de l'enfant bleu</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/baptiste-beaulieu-6375529</link>
      <description>durée : 00:08:53 - Une histoire et... Oli - Mais quel est donc le rêve de l'enfant bleu ? La réponse est dans l'histoire imaginée, et même racontée par Baptiste Beaulieu pour Oli. - invités : Baptiste Beaulieu - Baptiste Beaulieu : Médecin</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/06d2b286-68fa-453f-bde5-d31fc5b29c71/19721-28.06.2023-ITEMA_23420888-2023F33264E0007-21.mp3" length="8566802" type="audio/mpeg"/>
      <guid isPermaLink="false">3f209296-5d3e-44d9-9a9c-05befa42dc9b</guid>
      <pubDate>Wed, 28 Jun 2023 09:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0007</podcastRF:magnetothequeID>
      <itunes:title>L'histoire du rêve de l'enfant bleu</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>L'histoire,du,rêve,de,l'enfant,bleu</itunes:keywords>
      <itunes:subtitle>L'histoire du rêve de l'enfant bleu</itunes:subtitle>
      <itunes:summary>durée : 00:08:53 - Une histoire et... Oli - Mais quel est donc le rêve de l'enfant bleu ? La réponse est dans l'histoire imaginée, et même racontée par Baptiste Beaulieu pour Oli. - invités : Baptiste Beaulieu - Baptiste Beaulieu : Médecin</itunes:summary>
      <itunes:duration>00:08:53</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Théo et le grand pouvoir de son imagination"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/jeremy-fel-7000260</link>
      <description>durée : 00:09:46 - Une histoire et... Oli - Quelque soit votre destination de vacances, il ne faudra pas oublier de mettre dans vos bagages la nouvelle collection des histoires d'Oli celle de Jérémy Fel est passionnante car tel est pris qui croyait prendre ! - invités : Jérémy Fel - Jérémy Fel : Ecrivain, scénariste de courts-métrages et libraire.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/628381e5-20f9-40f1-aa6a-71f09e09d732/19721-28.06.2023-ITEMA_23420888-2023F33264E0008-21.mp3" length="9400809" type="audio/mpeg"/>
      <guid isPermaLink="false">0b52e493-8946-407b-8858-8f578ca579bb</guid>
      <pubDate>Wed, 28 Jun 2023 09:03:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0008</podcastRF:magnetothequeID>
      <itunes:title>"Théo et le grand pouvoir de son imagination"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Théo,et,le,grand,pouvoir,de,son,imagination"</itunes:keywords>
      <itunes:subtitle>"Théo et le grand pouvoir de son imagination"</itunes:subtitle>
      <itunes:summary>durée : 00:09:46 - Une histoire et... Oli - Quelque soit votre destination de vacances, il ne faudra pas oublier de mettre dans vos bagages la nouvelle collection des histoires d'Oli celle de Jérémy Fel est passionnante car tel est pris qui croyait prendre ! - invités : Jérémy Fel - Jérémy Fel : Ecrivain, scénariste de courts-métrages et libraire.</itunes:summary>
      <itunes:duration>00:09:46</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Hey la vache"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pone-5063591</link>
      <description>durée : 00:10:52 - Une histoire et... Oli - Sur la route des vacances en voiture, ou dans le train, rien de tel qu'une histoire pour accompagner le voyage de vos bouts de chou avec Oli, comme celle de Pone, racontée par Gaël Kamilindi , au titre très mystérieux mais rigolo comme tout.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/94b3a06f-8e9a-47ae-931b-feebb4e46b09/19721-28.06.2023-ITEMA_23420888-2023F33264E0009-21.mp3" length="10469505" type="audio/mpeg"/>
      <guid isPermaLink="false">d6c87b82-43fd-4084-870c-943f32e16491</guid>
      <pubDate>Wed, 28 Jun 2023 09:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0009</podcastRF:magnetothequeID>
      <itunes:title>"Hey la vache"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Hey,la,vache"</itunes:keywords>
      <itunes:subtitle>"Hey la vache"</itunes:subtitle>
      <itunes:summary>durée : 00:10:52 - Une histoire et... Oli - Sur la route des vacances en voiture, ou dans le train, rien de tel qu'une histoire pour accompagner le voyage de vos bouts de chou avec Oli, comme celle de Pone, racontée par Gaël Kamilindi , au titre très mystérieux mais rigolo comme tout.</itunes:summary>
      <itunes:duration>00:10:52</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L’enfant aux yeux de mer"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/gwenaelle-aubry-4246981</link>
      <description>durée : 00:12:17 - Une histoire et... Oli - Quoi de mieux qu'une jolie histoire, celle d'Oli, pour occuper vos enfants pendant les vacances, tout en les éloignant des écrans ? Et c'est grâce à Gwenaelle Aubry qui les emmène dans son imaginaire. Le sien est arc-en-ciel. - invités : Gwenaëlle Aubry - Gwenaëlle Aubry : romancière, philosophe, chercheuse au CNRS</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/023a05f9-15bd-473b-af08-e0cf0400e3fd/19721-28.06.2023-ITEMA_23420888-2023F33264E0011-21.mp3" length="11825792" type="audio/mpeg"/>
      <guid isPermaLink="false">25100126-c046-4197-b1e3-4155b8b4326c</guid>
      <pubDate>Wed, 28 Jun 2023 09:01:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0011</podcastRF:magnetothequeID>
      <itunes:title>"L’enfant aux yeux de mer"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L’enfant,aux,yeux,de,mer"</itunes:keywords>
      <itunes:subtitle>"L’enfant aux yeux de mer"</itunes:subtitle>
      <itunes:summary>durée : 00:12:17 - Une histoire et... Oli - Quoi de mieux qu'une jolie histoire, celle d'Oli, pour occuper vos enfants pendant les vacances, tout en les éloignant des écrans ? Et c'est grâce à Gwenaelle Aubry qui les emmène dans son imaginaire. Le sien est arc-en-ciel. - invités : Gwenaëlle Aubry - Gwenaëlle Aubry : romancière, philosophe, chercheuse au CNRS</itunes:summary>
      <itunes:duration>00:12:17</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La crique bleue"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/claire-castillon-4616218</link>
      <description>durée : 00:10:48 - Une histoire et... Oli - Oli est de retour pour les vacances, et vos enfants vont adorer l'histoire qu'a imaginé Claire Castillon. Une aventure qui sent bon le sable chaud, et la crème solaire. Des vacances à la plage pas comme les autres.  - invités : Claire CASTILLON - Claire Castillon : Romancière</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/9938f9d9-a0a0-4bc9-8ebe-6762abce1270/19721-28.06.2023-ITEMA_23420888-2023F33264E0010-21.mp3" length="10407180" type="audio/mpeg"/>
      <guid isPermaLink="false">da91b413-722d-4cce-9e30-f76b7c7fac6e</guid>
      <pubDate>Wed, 28 Jun 2023 09:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0010</podcastRF:magnetothequeID>
      <itunes:title>"La crique bleue"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,crique,bleue"</itunes:keywords>
      <itunes:subtitle>"La crique bleue"</itunes:subtitle>
      <itunes:summary>durée : 00:10:48 - Une histoire et... Oli - Oli est de retour pour les vacances, et vos enfants vont adorer l'histoire qu'a imaginé Claire Castillon. Une aventure qui sent bon le sable chaud, et la crème solaire. Des vacances à la plage pas comme les autres.  - invités : Claire CASTILLON - Claire Castillon : Romancière</itunes:summary>
      <itunes:duration>00:10:48</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Bruno le baleineau et le concours de splash"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/clement-benech-1392726</link>
      <description>durée : 00:11:13 - Une histoire et... Oli - Quand Clément Bénech était enfant, il a beaucoup lu, il a même dévoré toutes les publications pour la jeunesse alors pas étonnant que pour Oli, il a laissé vagabonder son imagination pour raconter l’histoire de cet adorable baleineau curieux de tout.  - invités : Clément Bénech - Clément Bénech : écrivain</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a7fe50ef-8693-4f0c-a0a3-d9675f8fe32a/19721-12.04.2023-ITEMA_23326757-2023F33264E0003-21.mp3" length="10802250" type="audio/mpeg"/>
      <guid isPermaLink="false">2af0fa14-7ad9-4e61-a5d7-2e6f2cd22bd8</guid>
      <pubDate>Wed, 12 Apr 2023 10:00:04 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0003</podcastRF:magnetothequeID>
      <itunes:title>"Bruno le baleineau et le concours de splash"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Bruno,le,baleineau,et,le,concours,de,splash"</itunes:keywords>
      <itunes:subtitle>"Bruno le baleineau et le concours de splash"</itunes:subtitle>
      <itunes:summary>durée : 00:11:13 - Une histoire et... Oli - Quand Clément Bénech était enfant, il a beaucoup lu, il a même dévoré toutes les publications pour la jeunesse alors pas étonnant que pour Oli, il a laissé vagabonder son imagination pour raconter l’histoire de cet adorable baleineau curieux de tout.  - invités : Clément Bénech - Clément Bénech : écrivain</itunes:summary>
      <itunes:duration>00:11:13</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Zazou et la faim des vacances"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/mahir-guven-1500371</link>
      <description>durée : 00:09:53 - Une histoire et... Oli - Mahir Guven écrit pour raconter des histoires aux gens, et parce qu’il ne sait pas, dixit l’écrivain, faire grand-chose d’autre qui le rende heureux. Et comme il aime partager, pour Oli, il raconte avec humour une merveilleuse histoire où il est question d'entraide et de générosité. - invités : Mahir Guven - Mahir Guven : Romancier, auteur de "Grand Frère" (Philippe Rey, 2017) et "Les Innocents" (Grasset, 2022)</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/706bbd10-3947-4cb2-9111-e62dbda3f300/19721-12.04.2023-ITEMA_23326757-2023F33264E0004-21.mp3" length="9518329" type="audio/mpeg"/>
      <guid isPermaLink="false">a1671bc3-ec01-46c2-ad1a-dccb42578a81</guid>
      <pubDate>Wed, 12 Apr 2023 10:00:03 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0004</podcastRF:magnetothequeID>
      <itunes:title>"Zazou et la faim des vacances"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Zazou,et,la,faim,des,vacances"</itunes:keywords>
      <itunes:subtitle>"Zazou et la faim des vacances"</itunes:subtitle>
      <itunes:summary>durée : 00:09:53 - Une histoire et... Oli - Mahir Guven écrit pour raconter des histoires aux gens, et parce qu’il ne sait pas, dixit l’écrivain, faire grand-chose d’autre qui le rende heureux. Et comme il aime partager, pour Oli, il raconte avec humour une merveilleuse histoire où il est question d'entraide et de générosité. - invités : Mahir Guven - Mahir Guven : Romancier, auteur de "Grand Frère" (Philippe Rey, 2017) et "Les Innocents" (Grasset, 2022)</itunes:summary>
      <itunes:duration>00:09:53</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La terrible histoire d’un petit géant qui n’était pas à la hauteur"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/sonia-devillers-4781262</link>
      <description>durée : 00:12:04 - Une histoire et... Oli - Sonia Devillers a eu une enfance bercée par les contes et légendes. Pour Oli, elle a imaginé et raconte l'histoire d'un petit frère qui n'a pas peur des grands. - invités : Sonia Devillers - Sonia Devillers : Productrice</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a33836f2-ae9b-42d6-8bf6-dddf1e582287/19721-12.04.2023-ITEMA_23326757-2023F33264E0005-21.mp3" length="11620108" type="audio/mpeg"/>
      <guid isPermaLink="false">c57d8cc2-f8f7-4496-94e9-56f110b8add9</guid>
      <pubDate>Wed, 12 Apr 2023 10:00:02 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0005</podcastRF:magnetothequeID>
      <itunes:title>"La terrible histoire d’un petit géant qui n’était pas à la hauteur"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,terrible,histoire,d’un,petit,géant,qui,n’était,pas,à,la,hauteur"</itunes:keywords>
      <itunes:subtitle>"La terrible histoire d’un petit géant qui n’était pas à la hauteur"</itunes:subtitle>
      <itunes:summary>durée : 00:12:04 - Une histoire et... Oli - Sonia Devillers a eu une enfance bercée par les contes et légendes. Pour Oli, elle a imaginé et raconte l'histoire d'un petit frère qui n'a pas peur des grands. - invités : Sonia Devillers - Sonia Devillers : Productrice</itunes:summary>
      <itunes:duration>00:12:04</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La grotte des couleurs"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/sonia-devillers-9913855</link>
      <description>durée : 00:12:34 - Une histoire et... Oli - Pour Cloé Korman, la forêt est l'univers du conte, le chemin qu'il faut retrouver, et pour Oli, elle a choisi de nous y emmener pour nous raconter l'histoire d'un petit garçon déterminé et surtout très courageux.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/60eb6e55-1f4b-48c1-bf88-9d9a22cc82b4/19721-10.04.2023-ITEMA_23351660-2023F33264E0002-21.mp3" length="12095317" type="audio/mpeg"/>
      <guid isPermaLink="false">30544946-b978-4a69-9bc1-c43b403468b1</guid>
      <pubDate>Mon, 10 Apr 2023 03:17:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0002</podcastRF:magnetothequeID>
      <itunes:title>"La grotte des couleurs"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,grotte,des,couleurs"</itunes:keywords>
      <itunes:subtitle>"La grotte des couleurs"</itunes:subtitle>
      <itunes:summary>durée : 00:12:34 - Une histoire et... Oli - Pour Cloé Korman, la forêt est l'univers du conte, le chemin qu'il faut retrouver, et pour Oli, elle a choisi de nous y emmener pour nous raconter l'histoire d'un petit garçon déterminé et surtout très courageux.</itunes:summary>
      <itunes:duration>00:12:34</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le grand concours"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/oli-du-lundi-06-mars-2023-9235902</link>
      <description>durée : 00:09:56 - Une histoire et... Oli - Pour Oli, Jul, connu pour son humour grinçant et son trait libre, a gardé le même esprit pour raconter l’histoire de cette institutrice rigolote et très originale.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/64b5adbd-f076-4be7-a269-8a7f36e5b01d/19721-10.04.2023-ITEMA_23351660-2023F33264E0001-21.mp3" length="9572413" type="audio/mpeg"/>
      <guid isPermaLink="false">d718f238-53c0-4d65-88c8-89fd79698e3d</guid>
      <pubDate>Mon, 10 Apr 2023 03:15:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0001</podcastRF:magnetothequeID>
      <itunes:title>"Le grand concours"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,grand,concours"</itunes:keywords>
      <itunes:subtitle>"Le grand concours"</itunes:subtitle>
      <itunes:summary>durée : 00:09:56 - Une histoire et... Oli - Pour Oli, Jul, connu pour son humour grinçant et son trait libre, a gardé le même esprit pour raconter l’histoire de cette institutrice rigolote et très originale.</itunes:summary>
      <itunes:duration>00:09:56</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Bande Annonce : Les nouveaux épisodes d'OLI</title>
      <link>https://www.franceinter.fr/culture/podcast-oli-des-histoires-du-soir-a-ecouter-avec-nos-enfants-de-5-a-7-ans</link>
      <description>durée : 00:01:04 - Une histoire et... Oli - Cloé Korman, Jul, Clément Benech, Mahir Guven et Sonia Devillers vous donnent rendez-vous le 12 avril pour découvrir les histoires qu'ils ont écrit pour les plus petits</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a01ece96-7d8c-420a-aeb6-63f95e27dfcc/19721-05.03.2023-ITEMA_23347001-2023F33264E0006-21.mp3" length="1061173" type="audio/mpeg"/>
      <guid isPermaLink="false">08159b86-5d30-44ef-bafc-3b809caf4256</guid>
      <pubDate>Sun, 05 Mar 2023 20:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2023F33264E0006</podcastRF:magnetothequeID>
      <itunes:title>Bande Annonce : Les nouveaux épisodes d'OLI</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>Bande,Annonce :,Les,nouveaux,épisodes,d'OLI</itunes:keywords>
      <itunes:subtitle>Bande Annonce : Les nouveaux épisodes d'OLI</itunes:subtitle>
      <itunes:summary>durée : 00:01:04 - Une histoire et... Oli - Cloé Korman, Jul, Clément Benech, Mahir Guven et Sonia Devillers vous donnent rendez-vous le 12 avril pour découvrir les histoires qu'ils ont écrit pour les plus petits</itunes:summary>
      <itunes:duration>00:01:04</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Ma première note" de Pierre Ducrozet et Jean-René Ducrozet</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-renard-roux-5973158</link>
      <description>durée : 00:16:13 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Othman Louati qui signe ce nouvel opus.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ef3888d6-6b4f-4bf8-a9ef-085701bedffe/19721-21.12.2022-ITEMA_23181447-2022F33264E0016-21.mp3" length="15592329" type="audio/mpeg"/>
      <guid isPermaLink="false">c0972add-4b36-40b5-bf32-0b7f15778f19</guid>
      <pubDate>Wed, 21 Dec 2022 08:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0016</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Ma première note" de Pierre Ducrozet et Jean-René Ducrozet</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Ma,première,note",de,Pierre,Ducrozet,et,Jean-René,Ducrozet</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Ma première note" de Pierre Ducrozet et Jean-René Ducrozet</itunes:subtitle>
      <itunes:summary>durée : 00:16:13 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Othman Louati qui signe ce nouvel opus.</itunes:summary>
      <itunes:duration>00:16:13</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Camille s'est perdu" de Marie Desplechin</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/oli-en-concert-camille-s-est-perdu-marie-desplechin-9786054</link>
      <description>durée : 00:14:48 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Othman Louati qui signe ce nouvel opus.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7430817e-13f6-4bc3-a923-d2d735d11cea/19721-21.12.2022-ITEMA_23181447-2022F33264E0017-21.mp3" length="14242752" type="audio/mpeg"/>
      <guid isPermaLink="false">4dada9de-7074-4535-bc78-a6793010d992</guid>
      <pubDate>Wed, 21 Dec 2022 08:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0017</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Camille s'est perdu" de Marie Desplechin</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Camille,s'est,perdu",de,Marie,Desplechin</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Camille s'est perdu" de Marie Desplechin</itunes:subtitle>
      <itunes:summary>durée : 00:14:48 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Othman Louati qui signe ce nouvel opus.</itunes:summary>
      <itunes:duration>00:14:48</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Néraïda de l'Olympe"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/oli-du-lundi-07-novembre-2022-5744170</link>
      <description>durée : 00:11:01 - Une histoire et... Oli - Acclamée par les médias comme "la J.K. Rowling québécoise", Anne Robillard raconte pour Oli, l'histoire d'une petite fille, curieuse tout plein et de sa famille pas comme les autres.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/84015a91-0ae3-4b76-aaad-8afbedd25e8f/19721-22.11.2022-ITEMA_23190072-2022F33264E0011-21.mp3" length="10613614" type="audio/mpeg"/>
      <guid isPermaLink="false">4dfe4d56-a5d6-47e1-89a1-639be6eb9d69</guid>
      <pubDate>Tue, 22 Nov 2022 20:00:04 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0011</podcastRF:magnetothequeID>
      <itunes:title>"Néraïda de l'Olympe"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Néraïda,de,l'Olympe"</itunes:keywords>
      <itunes:subtitle>"Néraïda de l'Olympe"</itunes:subtitle>
      <itunes:summary>durée : 00:11:01 - Une histoire et... Oli - Acclamée par les médias comme "la J.K. Rowling québécoise", Anne Robillard raconte pour Oli, l'histoire d'une petite fille, curieuse tout plein et de sa famille pas comme les autres.</itunes:summary>
      <itunes:duration>00:11:01</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Toutoune et Constantin et la grosse dame"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/toutoune-et-constantin-et-la-grosse-dame-5193710</link>
      <description>durée : 00:16:08 - Une histoire et... Oli - La dernière fois, Ariane Ascaride racontait pour Oli, la rencontre d'une petite fille, Toutoune, qui avait décidé de ne pas être comme les autres, avec Constantin, un petit garçon au nom d’empereur et qui se prenait un peu pour un empereur. Voici la suite de leurs aventures.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/8ad42e99-f811-41b1-b285-28da9a28e7e7/19721-22.11.2022-ITEMA_23190072-2022F33264E0015-21.mp3" length="15520220" type="audio/mpeg"/>
      <guid isPermaLink="false">81672e70-26b8-480a-b74c-49ee191a1379</guid>
      <pubDate>Tue, 22 Nov 2022 20:00:03 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0015</podcastRF:magnetothequeID>
      <itunes:title>"Toutoune et Constantin et la grosse dame"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Toutoune,et,Constantin,et,la,grosse,dame"</itunes:keywords>
      <itunes:subtitle>"Toutoune et Constantin et la grosse dame"</itunes:subtitle>
      <itunes:summary>durée : 00:16:08 - Une histoire et... Oli - La dernière fois, Ariane Ascaride racontait pour Oli, la rencontre d'une petite fille, Toutoune, qui avait décidé de ne pas être comme les autres, avec Constantin, un petit garçon au nom d’empereur et qui se prenait un peu pour un empereur. Voici la suite de leurs aventures.</itunes:summary>
      <itunes:duration>00:16:08</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Idriss et le secret du poulpe"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/idriss-et-le-secret-du-poulpe-5142303</link>
      <description>durée : 00:11:12 - Une histoire et... Oli - Simon Johannin est un écrivain qui a gardé son âme d'enfant et continue à aimer, imaginer des histoires comme pour Oli avec cette jolie histoire d'un petit garçon aux pouvoirs magiques.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/b499706a-bda0-41f5-98f6-d51d5a67eabc/19721-22.11.2022-ITEMA_23190072-2022F33264E0014-21.mp3" length="10787895" type="audio/mpeg"/>
      <guid isPermaLink="false">7b2e24eb-cc0f-4fab-9ab2-a08b36ad030c</guid>
      <pubDate>Tue, 22 Nov 2022 20:00:02 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0014</podcastRF:magnetothequeID>
      <itunes:title>"Idriss et le secret du poulpe"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Idriss,et,le,secret,du,poulpe"</itunes:keywords>
      <itunes:subtitle>"Idriss et le secret du poulpe"</itunes:subtitle>
      <itunes:summary>durée : 00:11:12 - Une histoire et... Oli - Simon Johannin est un écrivain qui a gardé son âme d'enfant et continue à aimer, imaginer des histoires comme pour Oli avec cette jolie histoire d'un petit garçon aux pouvoirs magiques.</itunes:summary>
      <itunes:duration>00:11:12</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La libellule et le bison, ou la fable de l'ouest américain"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-libellule-et-le-bison-ou-la-fable-de-l-ouest-americain-5049036</link>
      <description>durée : 00:09:35 - Une histoire et... Oli - Lorsque l'on a demandé pour Oli, aux journalistes, Mickael Thebault, Florence Paracuellos, et Nicolas Demorand de prêter leur voix, sur un texte écrit et imaginé par Emma Ferey, ils ne sont pas fait priés. À ne pas rater et à découvrir bien sûr ! - invités : Emma Férey - Emma Férey : Attachée de production</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/b5c54271-2fe6-40cf-b5c7-9dd894ea4c26/19721-22.11.2022-ITEMA_23190072-2022F33264E0013-21.mp3" length="9234137" type="audio/mpeg"/>
      <guid isPermaLink="false">eab80184-1cfc-40cf-ab10-161ba3a3a3a9</guid>
      <pubDate>Tue, 22 Nov 2022 20:00:01 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0013</podcastRF:magnetothequeID>
      <itunes:title>"La libellule et le bison, ou la fable de l'ouest américain"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,libellule,et,le,bison,,ou,la,fable,de,l'ouest,américain"</itunes:keywords>
      <itunes:subtitle>"La libellule et le bison, ou la fable de l'ouest américain"</itunes:subtitle>
      <itunes:summary>durée : 00:09:35 - Une histoire et... Oli - Lorsque l'on a demandé pour Oli, aux journalistes, Mickael Thebault, Florence Paracuellos, et Nicolas Demorand de prêter leur voix, sur un texte écrit et imaginé par Emma Ferey, ils ne sont pas fait priés. À ne pas rater et à découvrir bien sûr ! - invités : Emma Férey - Emma Férey : Attachée de production</itunes:summary>
      <itunes:duration>00:09:35</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Nansen, celui qui voulait être tout en haut"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/nansen-celui-qui-voulait-etre-tout-en-haut-1325523</link>
      <description>durée : 00:09:47 - Une histoire et... Oli - L'écrivain Alexis Jenni sait par goût et par expérience, raconter des histoires pour les grands, pour les petits, et pour Oli. La preuve avec cette extraordinaire et vraie vie d'un explorateur pas comme les autres.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/06fd76c4-fa1b-4466-91ab-f168426fb7c0/19721-22.11.2022-ITEMA_23190072-2022F33264E0012-21.mp3" length="9422961" type="audio/mpeg"/>
      <guid isPermaLink="false">368de42e-41e4-4b3f-9539-cc5652e6a9fb</guid>
      <pubDate>Tue, 22 Nov 2022 20:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0012</podcastRF:magnetothequeID>
      <itunes:title>"Nansen, celui qui voulait être tout en haut"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/a5f9e03b-2497-4d37-a298-cfe87466a96d/1400x1400_sc_oli-3000x3000-livre-copie.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Nansen,,celui,qui,voulait,être,tout,en,haut"</itunes:keywords>
      <itunes:subtitle>"Nansen, celui qui voulait être tout en haut"</itunes:subtitle>
      <itunes:summary>durée : 00:09:47 - Une histoire et... Oli - L'écrivain Alexis Jenni sait par goût et par expérience, raconter des histoires pour les grands, pour les petits, et pour Oli. La preuve avec cette extraordinaire et vraie vie d'un explorateur pas comme les autres.</itunes:summary>
      <itunes:duration>00:09:47</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le jour où Betty fait disparaître sa petite sœur Wanda"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-jour-ou-betty-fait-disparaitre-sa-petite-soeur-wanda-6823824</link>
      <description>durée : 00:09:40 - Une histoire et... Oli - Cet été, parmi les nombreuses activités pour occuper vos chers enfants, Oli saura les rendre sages comme des images avec cette histoire de l'écrivaine Lolita Pille, au titre très mystérieux. Suprise !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/cec6c417-c04b-4b82-b4c5-ae1f9a6e1994/19721-29.06.2022-ITEMA_23052811-2022F33264E0010-21.mp3" length="9317733" type="audio/mpeg"/>
      <guid isPermaLink="false">4b0e44ef-88fa-4882-bad8-61a5cb4f2c43</guid>
      <pubDate>Wed, 29 Jun 2022 10:00:04 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0010</podcastRF:magnetothequeID>
      <itunes:title>"Le jour où Betty fait disparaître sa petite sœur Wanda"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,jour,où,Betty,fait,disparaître,sa,petite,sœur,Wanda"</itunes:keywords>
      <itunes:subtitle>"Le jour où Betty fait disparaître sa petite sœur Wanda"</itunes:subtitle>
      <itunes:summary>durée : 00:09:40 - Une histoire et... Oli - Cet été, parmi les nombreuses activités pour occuper vos chers enfants, Oli saura les rendre sages comme des images avec cette histoire de l'écrivaine Lolita Pille, au titre très mystérieux. Suprise !</itunes:summary>
      <itunes:duration>00:09:40</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les pirates du mercredi"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-pirates-du-mercredi-3913151</link>
      <description>durée : 00:09:57 - Une histoire et... Oli - Chers parents lorsque vous écouterez le conte imaginé et raconté par Sylvain Prudhomme rien que pour Oli, vous saurez pourquoi vos enfants ne répondent jamais de suite à vos appels pour déjeuner ou dîner. Ils sont trop occupés ! Ils arrivent ! Ils arrivent !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/5777ca50-11d4-4039-9604-c0f85e100882/19721-29.06.2022-ITEMA_23052811-2022F33264E0009-21.mp3" length="9587761" type="audio/mpeg"/>
      <guid isPermaLink="false">5c200676-38be-4c9a-b6e1-90f30094059c</guid>
      <pubDate>Wed, 29 Jun 2022 10:00:03 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0009</podcastRF:magnetothequeID>
      <itunes:title>"Les pirates du mercredi"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,pirates,du,mercredi"</itunes:keywords>
      <itunes:subtitle>"Les pirates du mercredi"</itunes:subtitle>
      <itunes:summary>durée : 00:09:57 - Une histoire et... Oli - Chers parents lorsque vous écouterez le conte imaginé et raconté par Sylvain Prudhomme rien que pour Oli, vous saurez pourquoi vos enfants ne répondent jamais de suite à vos appels pour déjeuner ou dîner. Ils sont trop occupés ! Ils arrivent ! Ils arrivent !</itunes:summary>
      <itunes:duration>00:09:57</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>La véritable histoire de Bernard l'ermite</title>
      <link>https://www.franceinter.fr/culture/podcast-oli-des-histoires-du-soir-a-ecouter-avec-nos-enfants-de-5-a-7-ans</link>
      <description>durée : 00:08:50 - La véritable histoire de Bernard l'ermite - Votre enfant aime tellement les contes et histoires qu'il vous en demande de plus en plus ? Une seule solution, et elle s'appelle Oli pour écouter ensemble le merveilleux conte de l'écrivain Adrien Bosc.

L'équipe
Producteur délégué : Léonard Billot
Réalisation : Anne Lhioreau
Mixage : Julien Chabassut
Graphisme : Sarah Debris</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/90e5007a-5a51-43b1-a8bc-1c6c635ed970/19721-29.06.2022-ITEMA_23052811-2022F33264E0008-21.mp3" length="8509798" type="audio/mpeg"/>
      <guid isPermaLink="false">8d849612-8e22-46a2-9676-d9b576989a3f</guid>
      <pubDate>Wed, 29 Jun 2022 10:00:02 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0008</podcastRF:magnetothequeID>
      <itunes:title>La véritable histoire de Bernard l'ermite</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>La,véritable,histoire,de,Bernard,l'ermite</itunes:keywords>
      <itunes:subtitle>La véritable histoire de Bernard l'ermite</itunes:subtitle>
      <itunes:summary>durée : 00:08:50 - La véritable histoire de Bernard l'ermite - Votre enfant aime tellement les contes et histoires qu'il vous en demande de plus en plus ? Une seule solution, et elle s'appelle Oli pour écouter ensemble le merveilleux conte de l'écrivain Adrien Bosc.

L'équipe
Producteur délégué : Léonard Billot
Réalisation : Anne Lhioreau
Mixage : Julien Chabassut
Graphisme : Sarah Debris</itunes:summary>
      <itunes:duration>00:08:50</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le chapeau de Gigi, Sourina et Pipo"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-chapeau-de-gigi-sourina-et-pipo-6446882</link>
      <description>durée : 00:07:01 - Une histoire et... Oli - Pour Oli, Fabrice Drouelle et Marion Glemet racontent une très jolie histoire où il est question d'amitié, d'entraide, de voyage, et, et... de chapeau. Quelle aventure !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/494d0dcc-4922-4fc7-9f6d-f2411f362448/19721-29.06.2022-ITEMA_23052811-2022F33264E0007-21.mp3" length="6761355" type="audio/mpeg"/>
      <guid isPermaLink="false">342f6852-d9da-4538-94cc-8e47191dcece</guid>
      <pubDate>Wed, 29 Jun 2022 10:00:01 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0007</podcastRF:magnetothequeID>
      <itunes:title>"Le chapeau de Gigi, Sourina et Pipo"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,chapeau,de,Gigi,,Sourina,et,Pipo"</itunes:keywords>
      <itunes:subtitle>"Le chapeau de Gigi, Sourina et Pipo"</itunes:subtitle>
      <itunes:summary>durée : 00:07:01 - Une histoire et... Oli - Pour Oli, Fabrice Drouelle et Marion Glemet racontent une très jolie histoire où il est question d'amitié, d'entraide, de voyage, et, et... de chapeau. Quelle aventure !</itunes:summary>
      <itunes:duration>00:07:01</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L'histoire qui fait un petit peu peur mais heureusement y a des prouts dedans"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/l-histoire-qui-fait-un-petit-peu-peur-mais-heureusement-y-a-des-prouts-dedans-2369376</link>
      <description>durée : 00:08:38 - Une histoire et... Oli - Zabou Breitman a eu une merveilleuse enfance, très heureuse et c'est peut-être pour cela qu'elle a gardé son âme d'enfant. La preuve, car pour Oli, elle a écrit et raconte l'histoire d'un petit garçon malicieux et très courageux. Suspense et sourire garanti, c'est promis.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/082fa728-a291-4414-a97d-8b9a80d02983/19721-29.06.2022-ITEMA_23052811-2022F33264E0006-21.mp3" length="8314323" type="audio/mpeg"/>
      <guid isPermaLink="false">35679c00-b3b2-4182-af9b-254a0c0cceb1</guid>
      <pubDate>Wed, 29 Jun 2022 10:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0006</podcastRF:magnetothequeID>
      <itunes:title>"L'histoire qui fait un petit peu peur mais heureusement y a des prouts dedans"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L'histoire,qui,fait,un,petit,peu,peur,mais,heureusement,y,a,des,prouts,dedans"</itunes:keywords>
      <itunes:subtitle>"L'histoire qui fait un petit peu peur mais heureusement y a des prouts dedans"</itunes:subtitle>
      <itunes:summary>durée : 00:08:38 - Une histoire et... Oli - Zabou Breitman a eu une merveilleuse enfance, très heureuse et c'est peut-être pour cela qu'elle a gardé son âme d'enfant. La preuve, car pour Oli, elle a écrit et raconte l'histoire d'un petit garçon malicieux et très courageux. Suspense et sourire garanti, c'est promis.</itunes:summary>
      <itunes:duration>00:08:38</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le chapeau melon qui voulait partir en voyage"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-chapeau-melon-qui-voulait-partir-en-voyage-9457970</link>
      <description>durée : 00:08:23 - Une histoire et... Oli - Lorsque vous allez annoncer à vos enfants que leur série préférée, Oli, revient, ce sera la fête à la maison. En plus, avec une histoire écrite et racontée par Dorothée Barba, aidée par Lucien, 6 ans, là, toute votre famille, petits et grands, a de quoi se réjouir.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ff63cc52-9e9a-4135-9fa2-afd33a852f4f/19721-13.04.2022-ITEMA_22986020-2022F33264E0001-21.mp3" length="8086906" type="audio/mpeg"/>
      <guid isPermaLink="false">29ae0aa9-fa42-4df6-a5c3-58c27a0eee86</guid>
      <pubDate>Wed, 13 Apr 2022 10:00:04 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0001</podcastRF:magnetothequeID>
      <itunes:title>"Le chapeau melon qui voulait partir en voyage"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,chapeau,melon,qui,voulait,partir,en,voyage"</itunes:keywords>
      <itunes:subtitle>"Le chapeau melon qui voulait partir en voyage"</itunes:subtitle>
      <itunes:summary>durée : 00:08:23 - Une histoire et... Oli - Lorsque vous allez annoncer à vos enfants que leur série préférée, Oli, revient, ce sera la fête à la maison. En plus, avec une histoire écrite et racontée par Dorothée Barba, aidée par Lucien, 6 ans, là, toute votre famille, petits et grands, a de quoi se réjouir.</itunes:summary>
      <itunes:duration>00:08:23</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Anong et la grenouille de jade"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/anong-et-la-grenouille-de-jade-8326032</link>
      <description>durée : 00:09:30 - Une histoire et... Oli - Oli vous gâte avec cette histoire qu'a imaginée et que raconte Nadja, l'une des meilleures conteuses de la terre, si, si, si, en plus, elle nous emmène très loin, en Thaïlande, pour partager la vie d'une petite fille.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/e4353717-15b6-4bd4-bd57-6c72540c9969/19721-13.04.2022-ITEMA_22986020-2022F33264E0002-21.mp3" length="9151753" type="audio/mpeg"/>
      <guid isPermaLink="false">6c0c43d9-9ccf-4ef0-93c6-66bd872afefc</guid>
      <pubDate>Wed, 13 Apr 2022 10:00:03 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0002</podcastRF:magnetothequeID>
      <itunes:title>"Anong et la grenouille de jade"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Anong,et,la,grenouille,de,jade"</itunes:keywords>
      <itunes:subtitle>"Anong et la grenouille de jade"</itunes:subtitle>
      <itunes:summary>durée : 00:09:30 - Une histoire et... Oli - Oli vous gâte avec cette histoire qu'a imaginée et que raconte Nadja, l'une des meilleures conteuses de la terre, si, si, si, en plus, elle nous emmène très loin, en Thaïlande, pour partager la vie d'une petite fille.</itunes:summary>
      <itunes:duration>00:09:30</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La compagnie des rêves"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-compagnie-des-reves-5270693</link>
      <description>durée : 00:08:22 - Une histoire et... Oli - L'écrivain et journaliste, Hugo Lindenberg connaît bien le monde de l'enfance, et ne l'a pas quitté. Pour Oli, il continue à rêver, à imaginer, et vous raconte une histoire, celle d'un petit garçon et d'un drôle petit appareil magique, qui n'a pas l'air de fonctionner.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/d6a673ee-99d7-40a9-b8d1-cfcb2921b47f/19721-13.04.2022-ITEMA_22986020-2022F33264E0003-21.mp3" length="8067692" type="audio/mpeg"/>
      <guid isPermaLink="false">45055734-cdd2-4bc3-8d33-acb8d43d2465</guid>
      <pubDate>Wed, 13 Apr 2022 10:00:02 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0003</podcastRF:magnetothequeID>
      <itunes:title>"La compagnie des rêves"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,compagnie,des,rêves"</itunes:keywords>
      <itunes:subtitle>"La compagnie des rêves"</itunes:subtitle>
      <itunes:summary>durée : 00:08:22 - Une histoire et... Oli - L'écrivain et journaliste, Hugo Lindenberg connaît bien le monde de l'enfance, et ne l'a pas quitté. Pour Oli, il continue à rêver, à imaginer, et vous raconte une histoire, celle d'un petit garçon et d'un drôle petit appareil magique, qui n'a pas l'air de fonctionner.</itunes:summary>
      <itunes:duration>00:08:22</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L’homme le plus lent du monde"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/l-homme-le-plus-lent-du-monde-1859074</link>
      <description>durée : 00:10:27 - Une histoire et... Oli - Arthur Dreyfus est écrivain, mais pas seulement. Il adore raconter des histoires sans doute grâce à son extraordinaire grand-mère. Découvrons dans Oli, ce conte au titre si mystérieux.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/d48b96a1-1642-45d5-a068-69aef21b8cd5/19721-13.04.2022-ITEMA_22986020-2022F33264E0004-21.mp3" length="10059948" type="audio/mpeg"/>
      <guid isPermaLink="false">efc2a5d2-ea24-436b-b5df-25472d33eb64</guid>
      <pubDate>Wed, 13 Apr 2022 10:00:01 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0004</podcastRF:magnetothequeID>
      <itunes:title>"L’homme le plus lent du monde"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L’homme,le,plus,lent,du,monde"</itunes:keywords>
      <itunes:subtitle>"L’homme le plus lent du monde"</itunes:subtitle>
      <itunes:summary>durée : 00:10:27 - Une histoire et... Oli - Arthur Dreyfus est écrivain, mais pas seulement. Il adore raconter des histoires sans doute grâce à son extraordinaire grand-mère. Découvrons dans Oli, ce conte au titre si mystérieux.</itunes:summary>
      <itunes:duration>00:10:27</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Tête d’œuf et le voyage au Royaume des Rêves"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/tete-d-oeuf-et-le-voyage-au-royaume-des-reves-5288600</link>
      <description>durée : 00:10:35 - Une histoire et... Oli - Mais qui est donc "Tête d'œuf" ? Un drôle de nom...  C'est Barbara Carlotti qui va nous donner la réponse dans Oli. L' histoire de cette artiste venue d'ailleurs, vous emmène dans son univers, beau et étrange à la fois.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/6d979c2b-a1e2-4362-a6ad-0dd67ce51c5a/19721-13.04.2022-ITEMA_22986020-2022F33264E0005-21.mp3" length="10195466" type="audio/mpeg"/>
      <guid isPermaLink="false">035dbf1d-233b-43e9-83c3-0b2533e0965f</guid>
      <pubDate>Wed, 13 Apr 2022 10:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2022F33264E0005</podcastRF:magnetothequeID>
      <itunes:title>"Tête d’œuf et le voyage au Royaume des Rêves"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Tête,d’œuf,et,le,voyage,au,Royaume,des,Rêves"</itunes:keywords>
      <itunes:subtitle>"Tête d’œuf et le voyage au Royaume des Rêves"</itunes:subtitle>
      <itunes:summary>durée : 00:10:35 - Une histoire et... Oli - Mais qui est donc "Tête d'œuf" ? Un drôle de nom...  C'est Barbara Carlotti qui va nous donner la réponse dans Oli. L' histoire de cette artiste venue d'ailleurs, vous emmène dans son univers, beau et étrange à la fois.</itunes:summary>
      <itunes:duration>00:10:35</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L'arbre qui voulait voir le monde"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/l-arbre-qui-voulait-voir-le-monde-9557511</link>
      <description>durée : 00:11:06 - Une histoire et... Oli - Pour Oli, Marie Modiano, chanteuse et écrivaine, a laissé vagabonder son imagination avec l'histoire de cet arbre qui rêve d'un ailleurs. Un marronnier à qui il arrive pleins d'aventures et que vous allez adorer.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/5bd8a0b9-7858-4ff8-875c-54b40bc5416b/19721-22.12.2021-ITEMA_22870772-2021F33264E0058-21.mp3" length="10685241" type="audio/mpeg"/>
      <guid isPermaLink="false">5351b78b-2c6e-4808-9dad-8801c2e030d1</guid>
      <pubDate>Wed, 22 Dec 2021 09:00:04 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0058</podcastRF:magnetothequeID>
      <itunes:title>"L'arbre qui voulait voir le monde"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L'arbre,qui,voulait,voir,le,monde"</itunes:keywords>
      <itunes:subtitle>"L'arbre qui voulait voir le monde"</itunes:subtitle>
      <itunes:summary>durée : 00:11:06 - Une histoire et... Oli - Pour Oli, Marie Modiano, chanteuse et écrivaine, a laissé vagabonder son imagination avec l'histoire de cet arbre qui rêve d'un ailleurs. Un marronnier à qui il arrive pleins d'aventures et que vous allez adorer.</itunes:summary>
      <itunes:duration>00:11:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Lili, Tina, les clowns et les footballeuses"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/lili-tina-les-clowns-et-les-footballeuses-9321759</link>
      <description>durée : 00:10:54 - Une histoire et... Oli - Laure Adler est une femme passionnée, passionnante et étonnante. Pour Oli, elle a inventé, et raconte, les aventures de deux petites filles, différentes et amies pour la vie. À ne pas rater !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a750d249-0b0f-4697-800e-840b9b048b08/19721-22.12.2021-ITEMA_22870772-2021F33264E0057-21.mp3" length="10492530" type="audio/mpeg"/>
      <guid isPermaLink="false">e488f06a-6e7a-4bb7-b286-4a60c9ca8a87</guid>
      <pubDate>Wed, 22 Dec 2021 09:00:03 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0057</podcastRF:magnetothequeID>
      <itunes:title>"Lili, Tina, les clowns et les footballeuses"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Lili,,Tina,,les,clowns,et,les,footballeuses"</itunes:keywords>
      <itunes:subtitle>"Lili, Tina, les clowns et les footballeuses"</itunes:subtitle>
      <itunes:summary>durée : 00:10:54 - Une histoire et... Oli - Laure Adler est une femme passionnée, passionnante et étonnante. Pour Oli, elle a inventé, et raconte, les aventures de deux petites filles, différentes et amies pour la vie. À ne pas rater !</itunes:summary>
      <itunes:duration>00:10:54</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le Petit Pince"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-petit-pince-9377830</link>
      <description>durée : 00:15:34 - Une histoire et... Oli - Non, non, ce n'est pas une erreur, vous avez bien lu "Pince", et non pas "Prince". C'est normal puisque c'est le héros de l'histoire que l'écrivain, David Diop a écrit et raconté pour Oli. Un conte qui rend sage avec un roi, une reine, une princesse et d'autres personnages.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ef97eb6f-5a6e-450f-8886-67fc4543772d/19721-22.12.2021-ITEMA_22870772-2021F33264E0056-21.mp3" length="14981548" type="audio/mpeg"/>
      <guid isPermaLink="false">309f604d-dd1b-459a-9730-562c3005fe6b</guid>
      <pubDate>Wed, 22 Dec 2021 09:00:02 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0056</podcastRF:magnetothequeID>
      <itunes:title>"Le Petit Pince"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,Petit,Pince"</itunes:keywords>
      <itunes:subtitle>"Le Petit Pince"</itunes:subtitle>
      <itunes:summary>durée : 00:15:34 - Une histoire et... Oli - Non, non, ce n'est pas une erreur, vous avez bien lu "Pince", et non pas "Prince". C'est normal puisque c'est le héros de l'histoire que l'écrivain, David Diop a écrit et raconté pour Oli. Un conte qui rend sage avec un roi, une reine, une princesse et d'autres personnages.</itunes:summary>
      <itunes:duration>00:15:34</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Alzarus et le bâton de pluie"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/alzarus-et-le-baton-de-pluie-4476291</link>
      <description>durée : 00:10:44 - Une histoire et... Oli - Claire Berest est une conteuse hors-pair. Jugez-en plutôt avec ce petit garçon, au joli prénom, et à qui il arrive des aventures palpitantes. Mais au fait, c'est quoi un bâton de pluie ? Réponse dans Oli.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/b125ee40-3906-4855-af20-a76cb5695f2b/19721-22.12.2021-ITEMA_22870772-2021F33264E0055-21.mp3" length="10340436" type="audio/mpeg"/>
      <guid isPermaLink="false">1a8a3891-bdd8-4830-a02e-4d6bf2692dd9</guid>
      <pubDate>Wed, 22 Dec 2021 09:00:01 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0055</podcastRF:magnetothequeID>
      <itunes:title>"Alzarus et le bâton de pluie"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Alzarus,et,le,bâton,de,pluie"</itunes:keywords>
      <itunes:subtitle>"Alzarus et le bâton de pluie"</itunes:subtitle>
      <itunes:summary>durée : 00:10:44 - Une histoire et... Oli - Claire Berest est une conteuse hors-pair. Jugez-en plutôt avec ce petit garçon, au joli prénom, et à qui il arrive des aventures palpitantes. Mais au fait, c'est quoi un bâton de pluie ? Réponse dans Oli.</itunes:summary>
      <itunes:duration>00:10:44</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Owen, le petit zombie d'appartement"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/owen-le-petit-zombie-d-appartement-5102362</link>
      <description>durée : 00:09:22 - Une histoire et... Oli - L'auteur star des enfants, Antoine Dole aime raconter et imaginer de jolies histoires, et pour Oli, son héroïne est une adorable petite fille qui a terriblement envie d'un drôle animal de compagnie.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/2b4a49ff-334e-4861-b77c-28debe11c088/19721-22.12.2021-ITEMA_22870772-2021F33264E0054-21.mp3" length="9020065" type="audio/mpeg"/>
      <guid isPermaLink="false">8e2647b9-5f35-461e-8d66-1dda8b40e1d1</guid>
      <pubDate>Wed, 22 Dec 2021 09:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0054</podcastRF:magnetothequeID>
      <itunes:title>"Owen, le petit zombie d'appartement"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Owen,,le,petit,zombie,d'appartement"</itunes:keywords>
      <itunes:subtitle>"Owen, le petit zombie d'appartement"</itunes:subtitle>
      <itunes:summary>durée : 00:09:22 - Une histoire et... Oli - L'auteur star des enfants, Antoine Dole aime raconter et imaginer de jolies histoires, et pour Oli, son héroïne est une adorable petite fille qui a terriblement envie d'un drôle animal de compagnie.</itunes:summary>
      <itunes:duration>00:09:22</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Secret des parents" de Nicolas Mathieu</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/oli-en-concert-secret-des-parents-de-nicolas-mathieu-6397710</link>
      <description>durée : 00:17:14 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Thomas Enhco, compositeur et improvisateur de génie qui signe ce 1er opus.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/d6f391f9-3681-41d0-81f1-30c4e82e51b1/19721-22.12.2021-ITEMA_22870772-2021F33264E0060-21.mp3" length="16576406" type="audio/mpeg"/>
      <guid isPermaLink="false">d6db499a-2d34-4ef5-810d-7dac0867dd4f</guid>
      <pubDate>Wed, 22 Dec 2021 08:00:01 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0060</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Secret des parents" de Nicolas Mathieu</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Secret,des,parents",de,Nicolas,Mathieu</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Secret des parents" de Nicolas Mathieu</itunes:subtitle>
      <itunes:summary>durée : 00:17:14 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Thomas Enhco, compositeur et improvisateur de génie qui signe ce 1er opus.</itunes:summary>
      <itunes:duration>00:17:14</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>OLI en concert : "Le poisson d'argent" de Nina Bouraoui</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/oli-en-concert-le-poisson-d-argent-de-nina-bouraoui-3460580</link>
      <description>durée : 00:16:34 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Thomas Enhco, compositeur et improvisateur de génie qui signe ce 1er opus.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/c2bdc4ed-e45d-4b75-b037-409d6fad76ca/19721-22.12.2021-ITEMA_22870772-2021F33264E0059-21.mp3" length="15935674" type="audio/mpeg"/>
      <guid isPermaLink="false">c40a8b6c-1c17-4594-a297-773f3ffecba1</guid>
      <pubDate>Wed, 22 Dec 2021 08:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0059</podcastRF:magnetothequeID>
      <itunes:title>OLI en concert : "Le poisson d'argent" de Nina Bouraoui</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/02/22a123fb-0dc7-4f86-8f9d-7197d2b250e1/1400x1400_sc_carre-serie-oli-en-concert.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>OLI,en,concert,:,"Le,poisson,d'argent",de,Nina,Bouraoui</itunes:keywords>
      <itunes:subtitle>OLI en concert : "Le poisson d'argent" de Nina Bouraoui</itunes:subtitle>
      <itunes:summary>durée : 00:16:34 - Une histoire et... Oli - Oli en concert, ce sont des histoires mises en musique et interprétées par les musiciens de l’Orchestre Philharmonique de Radio France et c’est Thomas Enhco, compositeur et improvisateur de génie qui signe ce 1er opus.</itunes:summary>
      <itunes:duration>00:16:34</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Jojo le Ninja"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/jojo-le-ninja-6209389</link>
      <description>durée : 00:06:55 - Une histoire et... Oli - On connaît Thomas VDB, ses cheveux en bataille, et son côté lunaire mais moins le conteur d'histoires pour les enfants. C'est fait, grâce à Oli avec une histoire rigolote, musicale et beaucoup, beaucoup de suspense. À ne pas rater sous aucun prétexte.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/3dc35588-ee76-43b9-abcb-6afa7f3d5a6a/19721-21.10.2021-ITEMA_22814609-2021F33264E0053-21.mp3" length="6666619" type="audio/mpeg"/>
      <guid isPermaLink="false">93857f13-787a-4ef0-aa08-7ba187e20ac3</guid>
      <pubDate>Thu, 21 Oct 2021 23:08:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0053</podcastRF:magnetothequeID>
      <itunes:title>"Jojo le Ninja"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Jojo,le,Ninja"</itunes:keywords>
      <itunes:subtitle>"Jojo le Ninja"</itunes:subtitle>
      <itunes:summary>durée : 00:06:55 - Une histoire et... Oli - On connaît Thomas VDB, ses cheveux en bataille, et son côté lunaire mais moins le conteur d'histoires pour les enfants. C'est fait, grâce à Oli avec une histoire rigolote, musicale et beaucoup, beaucoup de suspense. À ne pas rater sous aucun prétexte.</itunes:summary>
      <itunes:duration>00:06:55</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Kim et son cœur sur la main"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/kim-et-son-coeur-sur-la-main-4470690</link>
      <description>durée : 00:08:01 - Une histoire et... Oli - Clara Ysé a toujours eu un rapport particulier à l’écriture. Depuis qu’elle est toute petite, l’écriture et la musique sont ses deux langues. Dans ses chansons, elle raconte des secrets, l’amitié, et la solidarité. Des thèmes que l'on retrouve dans la très belle histoire de Kim, qu'elle a imaginé pour Oli.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/e795cad1-e2de-4060-92b6-d338e4c761fb/19721-21.10.2021-ITEMA_22814609-2021F33264E0052-21.mp3" length="7733411" type="audio/mpeg"/>
      <guid isPermaLink="false">2ce26811-50aa-4eac-beda-8422cb2c3c29</guid>
      <pubDate>Thu, 21 Oct 2021 23:06:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0052</podcastRF:magnetothequeID>
      <itunes:title>"Kim et son cœur sur la main"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Kim,et,son,cœur,sur,la,main"</itunes:keywords>
      <itunes:subtitle>"Kim et son cœur sur la main"</itunes:subtitle>
      <itunes:summary>durée : 00:08:01 - Une histoire et... Oli - Clara Ysé a toujours eu un rapport particulier à l’écriture. Depuis qu’elle est toute petite, l’écriture et la musique sont ses deux langues. Dans ses chansons, elle raconte des secrets, l’amitié, et la solidarité. Des thèmes que l'on retrouve dans la très belle histoire de Kim, qu'elle a imaginé pour Oli.</itunes:summary>
      <itunes:duration>00:08:01</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le voleur de sapin"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-voleur-de-sapin-2434319</link>
      <description>durée : 00:10:01 - Une histoire et... Oli - La belle et vraie histoire d' Agnès Martin-Lugand est arrivée un lendemain de Noël, c'est peut-être pour cela qu'elle a choisi de conter et d'imaginer pour Oli, celle de ce mystérieux voleur qui chaparde tous les sapins de Noël.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/6386f45d-ba08-4d86-9250-8f2a873618ff/19721-21.10.2021-ITEMA_22814609-2021F33264E0051-21.mp3" length="9654152" type="audio/mpeg"/>
      <guid isPermaLink="false">6c2318b8-fe96-4cdf-808e-5a7c927604c6</guid>
      <pubDate>Thu, 21 Oct 2021 23:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0051</podcastRF:magnetothequeID>
      <itunes:title>"Le voleur de sapin"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,voleur,de,sapin"</itunes:keywords>
      <itunes:subtitle>"Le voleur de sapin"</itunes:subtitle>
      <itunes:summary>durée : 00:10:01 - Une histoire et... Oli - La belle et vraie histoire d' Agnès Martin-Lugand est arrivée un lendemain de Noël, c'est peut-être pour cela qu'elle a choisi de conter et d'imaginer pour Oli, celle de ce mystérieux voleur qui chaparde tous les sapins de Noël.</itunes:summary>
      <itunes:duration>00:10:01</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le paon rose"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-paon-rose-5767285</link>
      <description>durée : 00:10:28 - Une histoire et... Oli - L'écrivaine Kaouther Adimi aime les belles et merveilleuses histoires. Pour Oli, elle vous conte la belle histoire du plus majesteux des oiseaux : le paon à qui il arrive bien du souci. Mais que se passe-t-il ?</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/aec7c125-d02d-45da-af42-eac8c9222317/19721-21.10.2021-ITEMA_22814609-2021F33264E0050-21.mp3" length="10087116" type="audio/mpeg"/>
      <guid isPermaLink="false">f79d449f-f411-4501-a268-729810d5b21b</guid>
      <pubDate>Thu, 21 Oct 2021 23:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0050</podcastRF:magnetothequeID>
      <itunes:title>"Le paon rose"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,paon,rose"</itunes:keywords>
      <itunes:subtitle>"Le paon rose"</itunes:subtitle>
      <itunes:summary>durée : 00:10:28 - Une histoire et... Oli - L'écrivaine Kaouther Adimi aime les belles et merveilleuses histoires. Pour Oli, elle vous conte la belle histoire du plus majesteux des oiseaux : le paon à qui il arrive bien du souci. Mais que se passe-t-il ?</itunes:summary>
      <itunes:duration>00:10:28</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le jeu de la vérité"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-jeu-de-la-verite-4324841</link>
      <description>durée : 00:09:59 - Une histoire et... Oli - Grégoire Solotareff aime partir du réel pour raconter de jolies histoires. Pour Oli, gageons que celle de Charlie, le chat, et de Marie, la souris, est vraiment arrivée. Mais peu importe, puisqu'il suffit d'écouter l'auteur nous la raconter à sa façon.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/2676acf3-4c1c-431e-8a77-694019c8bcb2/19721-21.10.2021-ITEMA_22814609-2021F33264E0049-21.mp3" length="9618281" type="audio/mpeg"/>
      <guid isPermaLink="false">446a8793-893a-40a5-9eba-fa9d025755d3</guid>
      <pubDate>Thu, 21 Oct 2021 23:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0049</podcastRF:magnetothequeID>
      <itunes:title>"Le jeu de la vérité"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,jeu,de,la,vérité"</itunes:keywords>
      <itunes:subtitle>"Le jeu de la vérité"</itunes:subtitle>
      <itunes:summary>durée : 00:09:59 - Une histoire et... Oli - Grégoire Solotareff aime partir du réel pour raconter de jolies histoires. Pour Oli, gageons que celle de Charlie, le chat, et de Marie, la souris, est vraiment arrivée. Mais peu importe, puisqu'il suffit d'écouter l'auteur nous la raconter à sa façon.</itunes:summary>
      <itunes:duration>00:09:59</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le petit chevalier"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/claude-askolovitch-5535374</link>
      <description>durée : 00:12:06 - Une histoire et... Oli - Claude Askolovitch sait si bien nous raconter sa revue de presse sur France Inter, qu'il est évident que pour OLI, il a écrit cette belle histoire d'amour avec des chevaliers, et une princesse.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/22d8a4e2-86aa-4ef6-971e-1d89cfcb489b/19721-07.07.2021-ITEMA_22721872-2021F33264E0048-21.mp3" length="11654436" type="audio/mpeg"/>
      <guid isPermaLink="false">428289f4-9084-40cb-bdec-fe089b6921ca</guid>
      <pubDate>Wed, 07 Jul 2021 16:08:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0048</podcastRF:magnetothequeID>
      <itunes:title>"Le petit chevalier"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,petit,chevalier"</itunes:keywords>
      <itunes:subtitle>"Le petit chevalier"</itunes:subtitle>
      <itunes:summary>durée : 00:12:06 - Une histoire et... Oli - Claude Askolovitch sait si bien nous raconter sa revue de presse sur France Inter, qu'il est évident que pour OLI, il a écrit cette belle histoire d'amour avec des chevaliers, et une princesse.</itunes:summary>
      <itunes:duration>00:12:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L’histoire de la petite fille qui se trouvait trop petite dans un monde trop grand"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/l-histoire-de-la-petite-fille-qui-se-trouvait-trop-petite-dans-un-monde-trop-grand-7897306</link>
      <description>durée : 00:08:29 - Une histoire et... Oli - Faïza Guène aime à donner le goût de la lecture, voire de l’écriture. Comme l'héroïne de son histoire, pour OLI, l'auteure a de grands yeux noirs, elle est malicieuse et a surtout beaucoup d'imagination.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/2b5298df-e803-437d-aa18-8b0ef9e07a2f/19721-07.07.2021-ITEMA_22721872-2021F33264E0047-21.mp3" length="8178440" type="audio/mpeg"/>
      <guid isPermaLink="false">fc9b5b3a-8b47-44a9-84d0-7cd170ec4961</guid>
      <pubDate>Wed, 07 Jul 2021 16:06:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0047</podcastRF:magnetothequeID>
      <itunes:title>"L’histoire de la petite fille qui se trouvait trop petite dans un monde trop grand"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L’histoire,de,la,petite,fille,qui,se,trouvait,trop,petite,dans,un,monde,trop,grand"</itunes:keywords>
      <itunes:subtitle>"L’histoire de la petite fille qui se trouvait trop petite dans un monde trop grand"</itunes:subtitle>
      <itunes:summary>durée : 00:08:29 - Une histoire et... Oli - Faïza Guène aime à donner le goût de la lecture, voire de l’écriture. Comme l'héroïne de son histoire, pour OLI, l'auteure a de grands yeux noirs, elle est malicieuse et a surtout beaucoup d'imagination.</itunes:summary>
      <itunes:duration>00:08:29</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Zouzou et les nuggets magiques"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/zouzou-et-les-nuggets-magiques-9119863</link>
      <description>durée : 00:09:59 - Une histoire et... Oli - Oscar Coop-Phane a imaginé pour OLI, l'histoire d'une petite fille à qui il arrive pleins d'aventures avec un grand ours, des petits poussins jaunes, et... des frites. Une histoire qui lui est peut-être arrivée.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/56dee7e1-f7a8-4ec2-a14b-d7162f991547/19721-07.07.2021-ITEMA_22721872-2021F33264E0046-21.mp3" length="9609827" type="audio/mpeg"/>
      <guid isPermaLink="false">ca40472f-a0d0-41bf-bdde-c5e961704a05</guid>
      <pubDate>Wed, 07 Jul 2021 16:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0046</podcastRF:magnetothequeID>
      <itunes:title>"Zouzou et les nuggets magiques"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Zouzou,et,les,nuggets,magiques"</itunes:keywords>
      <itunes:subtitle>"Zouzou et les nuggets magiques"</itunes:subtitle>
      <itunes:summary>durée : 00:09:59 - Une histoire et... Oli - Oscar Coop-Phane a imaginé pour OLI, l'histoire d'une petite fille à qui il arrive pleins d'aventures avec un grand ours, des petits poussins jaunes, et... des frites. Une histoire qui lui est peut-être arrivée.</itunes:summary>
      <itunes:duration>00:09:59</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Au pays des Tout-oui"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/au-pays-des-tout-oui-4501128</link>
      <description>durée : 00:12:51 - Une histoire et... Oli - Déjà toute petite, Raphaëlle Giordano a toujours pris plaisir à s'évader dans l'imaginaire. Pour OLI, elle a inventé l'histoire d'un rêve qui s'est réalisé mais pas seulement sinon ce serait trop facile.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/cd1551d1-c55a-4f6a-8bdb-c24a8cd513fa/19721-07.07.2021-ITEMA_22721872-2021F33264E0045-21.mp3" length="12371674" type="audio/mpeg"/>
      <guid isPermaLink="false">158b57fd-345f-4c62-b7f6-80162e8080b8</guid>
      <pubDate>Wed, 07 Jul 2021 16:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0045</podcastRF:magnetothequeID>
      <itunes:title>"Au pays des Tout-oui"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Au,pays,des,Tout-oui"</itunes:keywords>
      <itunes:subtitle>"Au pays des Tout-oui"</itunes:subtitle>
      <itunes:summary>durée : 00:12:51 - Une histoire et... Oli - Déjà toute petite, Raphaëlle Giordano a toujours pris plaisir à s'évader dans l'imaginaire. Pour OLI, elle a inventé l'histoire d'un rêve qui s'est réalisé mais pas seulement sinon ce serait trop facile.</itunes:summary>
      <itunes:duration>00:12:51</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Toutoune et Constantin"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/ariane-ascaride-9943889</link>
      <description>durée : 00:08:11 - Une histoire et... Oli - Pour OLI, l'amoureuse des mots, du verbe, Ariane Ascaride a choisi de raconter à sa façon, la passionnante histoire d'une rencontre pas comme les autres.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/22c203e7-af2d-4437-a155-c127c9740762/19721-07.07.2021-ITEMA_22721872-2021F33264E0044-21.mp3" length="7886038" type="audio/mpeg"/>
      <guid isPermaLink="false">de5e3616-59de-4bc8-a68c-6d864587f54b</guid>
      <pubDate>Wed, 07 Jul 2021 16:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0044</podcastRF:magnetothequeID>
      <itunes:title>"Toutoune et Constantin"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Toutoune,et,Constantin"</itunes:keywords>
      <itunes:subtitle>"Toutoune et Constantin"</itunes:subtitle>
      <itunes:summary>durée : 00:08:11 - Une histoire et... Oli - Pour OLI, l'amoureuse des mots, du verbe, Ariane Ascaride a choisi de raconter à sa façon, la passionnante histoire d'une rencontre pas comme les autres.</itunes:summary>
      <itunes:duration>00:08:11</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L'histoire des Mims Petro et Jean Pims"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/arthur-teboul-feu-chaterton-et-blandine-rinkel-catastrophe-6965100</link>
      <description>durée : 00:11:17 - Une histoire et... Oli - Quand deux artistes talentueux se rencontrent, cela donne par exemple des chansons, des livres, et surtout un conte pour OLI. Blandine Rinkel et Arthur Teboul se sont bien amusés. Elle, à écrire et tous les deux, à raconter l'histoire de Pims et de Petro, mais aussi des Dultes. À ne pas rater.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7e99c57e-d3d9-4c19-9409-22b5a211c17d/19721-23.04.2021-ITEMA_22645181-2021F33264E0043-21.mp3" length="10860950" type="audio/mpeg"/>
      <guid isPermaLink="false">5007fa80-de2c-4d3b-b2ba-0374d95ca0c3</guid>
      <pubDate>Fri, 23 Apr 2021 16:38:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0043</podcastRF:magnetothequeID>
      <itunes:title>"L'histoire des Mims Petro et Jean Pims"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L'histoire,des,Mims,Petro,et,Jean,Pims"</itunes:keywords>
      <itunes:subtitle>"L'histoire des Mims Petro et Jean Pims"</itunes:subtitle>
      <itunes:summary>durée : 00:11:17 - Une histoire et... Oli - Quand deux artistes talentueux se rencontrent, cela donne par exemple des chansons, des livres, et surtout un conte pour OLI. Blandine Rinkel et Arthur Teboul se sont bien amusés. Elle, à écrire et tous les deux, à raconter l'histoire de Pims et de Petro, mais aussi des Dultes. À ne pas rater.</itunes:summary>
      <itunes:duration>00:11:17</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Messidor et les bananes de compagnie"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/eva-bester-messidor-et-les-bananes-de-compagnie-6355740</link>
      <description>durée : 00:08:34 - Une histoire et... Oli - Eva Bester a beaucoup beaucoup d'imagination et pour vous, elle partage une histoire pour OLI, celle de Messidor, un chien-triangle tout ce qu’il y a de plus banal. Un chien-triangle ? Mais si, mais si !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a4b2bbbd-f9f8-4542-a051-e3dbc4364801/19721-23.04.2021-ITEMA_22645181-2021F33264E0042-21.mp3" length="8256883" type="audio/mpeg"/>
      <guid isPermaLink="false">9af1602b-63ab-4c99-a372-511c3cb1ad40</guid>
      <pubDate>Fri, 23 Apr 2021 16:36:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0042</podcastRF:magnetothequeID>
      <itunes:title>"Messidor et les bananes de compagnie"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Messidor,et,les,bananes,de,compagnie"</itunes:keywords>
      <itunes:subtitle>"Messidor et les bananes de compagnie"</itunes:subtitle>
      <itunes:summary>durée : 00:08:34 - Une histoire et... Oli - Eva Bester a beaucoup beaucoup d'imagination et pour vous, elle partage une histoire pour OLI, celle de Messidor, un chien-triangle tout ce qu’il y a de plus banal. Un chien-triangle ? Mais si, mais si !</itunes:summary>
      <itunes:duration>00:08:34</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Fabien et la housse de couette"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/fab-caro-fabien-et-la-housse-de-couette-2646436</link>
      <description>durée : 00:07:45 - Une histoire et... Oli - Qui, un jour, a réussi l'exploit de mettre une housse de couette d'un seul coup ? Pour raconter son histoire pou OLI, Fabcaro a choisit le rire et l’autodérision comme seuls vrais remèdes à la fatalité même pour les petites choses du quotidien.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/28af4c8b-027c-4597-83c4-1f5bce2c46d6/19721-23.04.2021-ITEMA_22645181-2021F33264E0041-21.mp3" length="7464090" type="audio/mpeg"/>
      <guid isPermaLink="false">461e2b97-c2b3-444d-8f95-16a0d4e93a5b</guid>
      <pubDate>Fri, 23 Apr 2021 16:34:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0041</podcastRF:magnetothequeID>
      <itunes:title>"Fabien et la housse de couette"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Fabien,et,la,housse,de,couette"</itunes:keywords>
      <itunes:subtitle>"Fabien et la housse de couette"</itunes:subtitle>
      <itunes:summary>durée : 00:07:45 - Une histoire et... Oli - Qui, un jour, a réussi l'exploit de mettre une housse de couette d'un seul coup ? Pour raconter son histoire pou OLI, Fabcaro a choisit le rire et l’autodérision comme seuls vrais remèdes à la fatalité même pour les petites choses du quotidien.</itunes:summary>
      <itunes:duration>00:07:45</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Ignatus le Dragon"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/anne-pauly-ignatus-le-dragon-7180105</link>
      <description>durée : 00:10:43 - Une histoire et... Oli - Pour OLI, Anne Pauly partage une histoire que sa tante Viviane comme la fée, lui racontait quand elle était petite. Un conte qui l'emmenait très loin, dans le pays du sommeil.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/5729b8e4-4dcb-4d52-873c-46dca6379efc/19721-23.04.2021-ITEMA_22645181-2021F33264E0040-21.mp3" length="10312831" type="audio/mpeg"/>
      <guid isPermaLink="false">dd28b898-0299-46bc-a872-9e3535687fc8</guid>
      <pubDate>Fri, 23 Apr 2021 16:32:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0040</podcastRF:magnetothequeID>
      <itunes:title>"Ignatus le Dragon"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Ignatus,le,Dragon"</itunes:keywords>
      <itunes:subtitle>"Ignatus le Dragon"</itunes:subtitle>
      <itunes:summary>durée : 00:10:43 - Une histoire et... Oli - Pour OLI, Anne Pauly partage une histoire que sa tante Viviane comme la fée, lui racontait quand elle était petite. Un conte qui l'emmenait très loin, dans le pays du sommeil.</itunes:summary>
      <itunes:duration>00:10:43</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La fourmi et le croque-monsieur"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/yann-queffelec-la-fourmi-et-le-croque-monsieur-8769295</link>
      <description>durée : 00:13:33 - Une histoire et... Oli - Yann Queffelec adore écrire et raconter des histoires, pour les grands et pour les petits. Grâce à OLI, vous ferez la connaissance d'un très gentil petit garçon qui avait hâte d'être à demain.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/11e8c151-442b-4527-b266-a2d70003373e/19721-23.04.2021-ITEMA_22645181-2021F33264E0039-21.mp3" length="13037889" type="audio/mpeg"/>
      <guid isPermaLink="false">f29f9933-e215-425b-a798-911310a4ee77</guid>
      <pubDate>Fri, 23 Apr 2021 16:30:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0039</podcastRF:magnetothequeID>
      <itunes:title>"La fourmi et le croque-monsieur"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,fourmi,et,le,croque-monsieur"</itunes:keywords>
      <itunes:subtitle>"La fourmi et le croque-monsieur"</itunes:subtitle>
      <itunes:summary>durée : 00:13:33 - Une histoire et... Oli - Yann Queffelec adore écrire et raconter des histoires, pour les grands et pour les petits. Grâce à OLI, vous ferez la connaissance d'un très gentil petit garçon qui avait hâte d'être à demain.</itunes:summary>
      <itunes:duration>00:13:33</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le dernier poisson"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pef-le-dernier-poisson-1757959</link>
      <description>durée : 00:13:37 - Une histoire et... Oli - L'auteur et dessinateur, Pef ressemble à celui qu'on imagine, c'est-à-dire, un grand sourire et une longue barbe blanche, une vraie. Pour OLI, il a pris son stylo de militant pour parler de l'environnement à travers une très jolie histoire.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/b005e304-9bda-4663-8c81-caff3d96cba9/19721-05.02.2021-ITEMA_22565468-2021F33264E0035-21.mp3" length="13101502" type="audio/mpeg"/>
      <guid isPermaLink="false">8fb39d9e-7c22-46ae-b812-2b86d2dd2cc2</guid>
      <pubDate>Fri, 05 Feb 2021 15:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0035</podcastRF:magnetothequeID>
      <itunes:title>"Le dernier poisson"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,dernier,poisson"</itunes:keywords>
      <itunes:subtitle>"Le dernier poisson"</itunes:subtitle>
      <itunes:summary>durée : 00:13:37 - Une histoire et... Oli - L'auteur et dessinateur, Pef ressemble à celui qu'on imagine, c'est-à-dire, un grand sourire et une longue barbe blanche, une vraie. Pour OLI, il a pris son stylo de militant pour parler de l'environnement à travers une très jolie histoire.</itunes:summary>
      <itunes:duration>00:13:37</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Victoria, la femme qui n'aimait pas les enfants"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/anne-berest-victoria-la-femme-qui-n-aimait-pas-les-enfants-6459668</link>
      <description>durée : 00:09:52 - Une histoire et... Oli - Qui a décrété que toutes les femmes devaient aimer les enfants ? La question reste posée. En tous les cas, pour OLI, l'auteure, Anne Berest a imaginé l'histoire de Victoria avec beaucoup d'humour et de finesse.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/26f6d37f-0a72-476f-b528-4107e90ea8fb/19721-05.02.2021-ITEMA_22565468-2021F33264E0038-21.mp3" length="9499916" type="audio/mpeg"/>
      <guid isPermaLink="false">1c9d63df-873b-4457-8ef7-0347dfffdad2</guid>
      <pubDate>Fri, 05 Feb 2021 15:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0038</podcastRF:magnetothequeID>
      <itunes:title>"Victoria, la femme qui n'aimait pas les enfants"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Victoria,,la,femme,qui,n'aimait,pas,les,enfants"</itunes:keywords>
      <itunes:subtitle>"Victoria, la femme qui n'aimait pas les enfants"</itunes:subtitle>
      <itunes:summary>durée : 00:09:52 - Une histoire et... Oli - Qui a décrété que toutes les femmes devaient aimer les enfants ? La question reste posée. En tous les cas, pour OLI, l'auteure, Anne Berest a imaginé l'histoire de Victoria avec beaucoup d'humour et de finesse.</itunes:summary>
      <itunes:duration>00:09:52</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Cueillette et le prince de feu" </title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/franck-thilliez-cueillette-et-le-prince-de-feu-9503144</link>
      <description>durée : 00:11:29 - Une histoire et... Oli - Tous les parents connaissent Franck Thilliez et ont sûrement lu au moins un de ses romans. Pour OLI, le maître du suspense va réjouir l'imaginaire des enfants avec un conte écrit et raconté comme un thriller, si, si, si.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7e04e63a-2fa5-471f-afa7-a30feaab467d/19721-05.02.2021-ITEMA_22565468-2021F33264E0037-21.mp3" length="11053059" type="audio/mpeg"/>
      <guid isPermaLink="false">c83647fa-ef43-462c-8369-73f079c22594</guid>
      <pubDate>Fri, 05 Feb 2021 15:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0037</podcastRF:magnetothequeID>
      <itunes:title>"Cueillette et le prince de feu" </itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Cueillette,et,le,prince,de,feu",</itunes:keywords>
      <itunes:subtitle>"Cueillette et le prince de feu" </itunes:subtitle>
      <itunes:summary>durée : 00:11:29 - Une histoire et... Oli - Tous les parents connaissent Franck Thilliez et ont sûrement lu au moins un de ses romans. Pour OLI, le maître du suspense va réjouir l'imaginaire des enfants avec un conte écrit et raconté comme un thriller, si, si, si.</itunes:summary>
      <itunes:duration>00:11:29</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Léo et le chat de la plage"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/lea-salame-cleo-et-le-chat-de-la-plage-6799095</link>
      <description>durée : 00:09:10 - Une histoire et... Oli - Mais qui est Léo ? Et pourquoi le chat de la plage ? Réponses dans une histoire que vous raconte la journaliste, Léa Salamé. Cadeau pour vous, à découvrir et à ne pas rater dans OLI.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/169e4c89-15a5-4d57-8f94-98f868284da7/19721-05.02.2021-ITEMA_22565468-2021F33264E0034-21.mp3" length="8827377" type="audio/mpeg"/>
      <guid isPermaLink="false">f77a6e3f-0a54-4037-bd9e-24592fd07c06</guid>
      <pubDate>Fri, 05 Feb 2021 15:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0034</podcastRF:magnetothequeID>
      <itunes:title>"Léo et le chat de la plage"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Léo,et,le,chat,de,la,plage"</itunes:keywords>
      <itunes:subtitle>"Léo et le chat de la plage"</itunes:subtitle>
      <itunes:summary>durée : 00:09:10 - Une histoire et... Oli - Mais qui est Léo ? Et pourquoi le chat de la plage ? Réponses dans une histoire que vous raconte la journaliste, Léa Salamé. Cadeau pour vous, à découvrir et à ne pas rater dans OLI.</itunes:summary>
      <itunes:duration>00:09:10</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Coline la chaussette orpheline" </title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-grande-sophie-coline-la-chaussette-orpheline-8442608</link>
      <description>durée : 00:10:12 - Une histoire et... Oli - Pour OLI, La Grande Sophie a gardé son âme d'enfant et en donne la preuve avec une jolie histoire, celle d'une paire de chaussettes, toutes mignonnes. Une histoire qui finit bien heureusement. Mais chut !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/9e2ceafe-30d5-40c1-9190-e08b3fe22e25/19721-05.02.2021-ITEMA_22565468-2021F33264E0036-21.mp3" length="9822556" type="audio/mpeg"/>
      <guid isPermaLink="false">395c8374-d462-48c4-9cb0-84afa22cb56b</guid>
      <pubDate>Fri, 05 Feb 2021 15:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2021F33264E0036</podcastRF:magnetothequeID>
      <itunes:title>"Coline la chaussette orpheline" </itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Coline,la,chaussette,orpheline",</itunes:keywords>
      <itunes:subtitle>"Coline la chaussette orpheline" </itunes:subtitle>
      <itunes:summary>durée : 00:10:12 - Une histoire et... Oli - Pour OLI, La Grande Sophie a gardé son âme d'enfant et en donne la preuve avec une jolie histoire, celle d'une paire de chaussettes, toutes mignonnes. Une histoire qui finit bien heureusement. Mais chut !</itunes:summary>
      <itunes:duration>00:10:12</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le petit garçon et les animaux disparus"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-petit-garcon-et-les-animaux-liberes-7275661</link>
      <description>durée : 00:10:22 - Une histoire et... Oli - Mais pourquoi tous les animaux de la maison ont disparu ? La réponse est dans "Le petit garçon et les animaux disparus", un conte original écrit et raconté par Tanguy Pastureau pour Oli.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/9bc86f71-04b4-4cb9-880f-f02b1fedfc71/19721-30.11.2020-ITEMA_22499530-2020F33264E0033-21.mp3" length="9987246" type="audio/mpeg"/>
      <guid isPermaLink="false">de3c9d93-c697-455a-bd0e-2e9567f551e6</guid>
      <pubDate>Mon, 30 Nov 2020 09:08:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0033</podcastRF:magnetothequeID>
      <itunes:title>"Le petit garçon et les animaux disparus"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,petit,garçon,et,les,animaux,disparus"</itunes:keywords>
      <itunes:subtitle>"Le petit garçon et les animaux disparus"</itunes:subtitle>
      <itunes:summary>durée : 00:10:22 - Une histoire et... Oli - Mais pourquoi tous les animaux de la maison ont disparu ? La réponse est dans "Le petit garçon et les animaux disparus", un conte original écrit et raconté par Tanguy Pastureau pour Oli.</itunes:summary>
      <itunes:duration>00:10:22</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les métamorphoses d'Adèle"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/l-histoire-de-la-fille-qui-se-transforma-en-ours-6203312</link>
      <description>durée : 00:12:06 - Une histoire et... Oli - Pour Oli, l'écrivain Pierre Ducrozet a imaginé l'histoire magique d'Adèle que vos enfants vont adorer écouter, et vous aussi sûrement.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/4ceb50bd-b2bd-4861-96f0-ba6a2d7efe37/19721-30.11.2020-ITEMA_22499530-2020F33264E0032-21.mp3" length="11639725" type="audio/mpeg"/>
      <guid isPermaLink="false">1e09a2e4-7089-4c97-85b0-4fff18da75a5</guid>
      <pubDate>Mon, 30 Nov 2020 09:06:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0032</podcastRF:magnetothequeID>
      <itunes:title>"Les métamorphoses d'Adèle"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,métamorphoses,d'Adèle"</itunes:keywords>
      <itunes:subtitle>"Les métamorphoses d'Adèle"</itunes:subtitle>
      <itunes:summary>durée : 00:12:06 - Une histoire et... Oli - Pour Oli, l'écrivain Pierre Ducrozet a imaginé l'histoire magique d'Adèle que vos enfants vont adorer écouter, et vous aussi sûrement.</itunes:summary>
      <itunes:duration>00:12:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le procès de Chatoune"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-proces-de-chatoune-3789622</link>
      <description>durée : 00:09:22 - Une histoire et... Oli - Vous allez comprendre le titre de ce nouveau conte dans Oli grâce à Titiou Lecoq qui va tout expliquer et  surtout vous raconter une jolie histoire.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/bce4da0c-8afd-4006-8329-e92b9a55be67/19721-30.11.2020-ITEMA_22499530-2020F33264E0031-21.mp3" length="9017050" type="audio/mpeg"/>
      <guid isPermaLink="false">78769add-dbc8-4050-913e-58a0fd6e168d</guid>
      <pubDate>Mon, 30 Nov 2020 09:04:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0031</podcastRF:magnetothequeID>
      <itunes:title>"Le procès de Chatoune"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,procès,de,Chatoune"</itunes:keywords>
      <itunes:subtitle>"Le procès de Chatoune"</itunes:subtitle>
      <itunes:summary>durée : 00:09:22 - Une histoire et... Oli - Vous allez comprendre le titre de ce nouveau conte dans Oli grâce à Titiou Lecoq qui va tout expliquer et  surtout vous raconter une jolie histoire.</itunes:summary>
      <itunes:duration>00:09:22</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Madeleine et les mots qui fâchent"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/madeleine-et-les-mots-qui-fachent-3458787</link>
      <description>durée : 00:10:48 - Une histoire et... Oli - Des mots qui fâchent ? Mais lesquels ? La réponse vous est racontée par Mazarine Pingeot et Léonie Pingeot dans Oli.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7d17f1ae-17da-455a-b75a-cc2a37aba66a/19721-30.11.2020-ITEMA_22499530-2020F33264E0030-21.mp3" length="10401292" type="audio/mpeg"/>
      <guid isPermaLink="false">f12c7586-635c-4d8b-bf87-75edc5106ae3</guid>
      <pubDate>Mon, 30 Nov 2020 09:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0030</podcastRF:magnetothequeID>
      <itunes:title>"Madeleine et les mots qui fâchent"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Madeleine,et,les,mots,qui,fâchent"</itunes:keywords>
      <itunes:subtitle>"Madeleine et les mots qui fâchent"</itunes:subtitle>
      <itunes:summary>durée : 00:10:48 - Une histoire et... Oli - Des mots qui fâchent ? Mais lesquels ? La réponse vous est racontée par Mazarine Pingeot et Léonie Pingeot dans Oli.</itunes:summary>
      <itunes:duration>00:10:48</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le Sapin de Saint-Etienne"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-sapin-de-st-etienne-8846310</link>
      <description>durée : 00:11:54 - Une histoire et... Oli - Un titre bien mystérieux pour une nouvelle histoire d'Oli, et c'est Mathias Malzieu accompagné par Daria Nelson qui l'a trouvé. Ensemble, le duo l'a aussi imaginée et va la raconter. Vos enfants vont se régaler.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/25034f30-4773-4965-aac2-44e9861142d4/19721-30.11.2020-ITEMA_22499530-2020F33264E0029-21.mp3" length="11449677" type="audio/mpeg"/>
      <guid isPermaLink="false">0182eac5-c2f6-4046-8964-643a631189a8</guid>
      <pubDate>Mon, 30 Nov 2020 09:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0029</podcastRF:magnetothequeID>
      <itunes:title>"Le Sapin de Saint-Etienne"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,Sapin,de,Saint-Etienne"</itunes:keywords>
      <itunes:subtitle>"Le Sapin de Saint-Etienne"</itunes:subtitle>
      <itunes:summary>durée : 00:11:54 - Une histoire et... Oli - Un titre bien mystérieux pour une nouvelle histoire d'Oli, et c'est Mathias Malzieu accompagné par Daria Nelson qui l'a trouvé. Ensemble, le duo l'a aussi imaginée et va la raconter. Vos enfants vont se régaler.</itunes:summary>
      <itunes:duration>00:11:54</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Bouboule, la poule trop cool"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/bouboule-la-poule-trop-cool-8985485</link>
      <description>durée : 00:10:39 - Une histoire et... Oli - Oli est le moyen idéal pour occuper vos enfants, tout en les coupant de l’écran. En plus, si vous leur dites que l'histoire de "Bouboule, la poule trop cool" sera racontée par Daniel Morin, lui-même, qui raconte toujours des bêtises pour nous faire rire à la radio.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/8c20d068-d4d8-47c6-bed8-7631cb4f75b8/19721-28.09.2020-ITEMA_22439963-2020F33264E0028-21.mp3" length="10259440" type="audio/mpeg"/>
      <guid isPermaLink="false">eb4be05b-b40a-4ed8-a6b0-2c1dc13b9e9b</guid>
      <pubDate>Mon, 28 Sep 2020 01:08:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0028</podcastRF:magnetothequeID>
      <itunes:title>"Bouboule, la poule trop cool"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Bouboule,,la,poule,trop,cool"</itunes:keywords>
      <itunes:subtitle>"Bouboule, la poule trop cool"</itunes:subtitle>
      <itunes:summary>durée : 00:10:39 - Une histoire et... Oli - Oli est le moyen idéal pour occuper vos enfants, tout en les coupant de l’écran. En plus, si vous leur dites que l'histoire de "Bouboule, la poule trop cool" sera racontée par Daniel Morin, lui-même, qui raconte toujours des bêtises pour nous faire rire à la radio.</itunes:summary>
      <itunes:duration>00:10:39</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Danser !" </title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/danser-3280328</link>
      <description>durée : 00:08:44 - Une histoire et... Oli - Vos enfants aiment s'endormir avec de jolies histoires ? Cela tombe bien car Oli, revient avec des contes qui vont les aider à imaginer, à leur donner le sens de l'écoute et à rêver avec l'histoire de Léo et Ondine, imaginée par Carole Martinez.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ada4fb9d-b173-41d8-b7c3-e15488fbde0d/19721-28.09.2020-ITEMA_22439963-2020F33264E0027-21.mp3" length="8409912" type="audio/mpeg"/>
      <guid isPermaLink="false">4ce9fb1b-bf9e-4761-b76f-0b8244cde7cc</guid>
      <pubDate>Mon, 28 Sep 2020 01:06:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0027</podcastRF:magnetothequeID>
      <itunes:title>"Danser !" </itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Danser,!",</itunes:keywords>
      <itunes:subtitle>"Danser !" </itunes:subtitle>
      <itunes:summary>durée : 00:08:44 - Une histoire et... Oli - Vos enfants aiment s'endormir avec de jolies histoires ? Cela tombe bien car Oli, revient avec des contes qui vont les aider à imaginer, à leur donner le sens de l'écoute et à rêver avec l'histoire de Léo et Ondine, imaginée par Carole Martinez.</itunes:summary>
      <itunes:duration>00:08:44</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Jean-Bébé" </title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/jean-bebe-2041053</link>
      <description>durée : 00:10:15 - Une histoire et... Oli - Quelle bonne nouvelle, vous allez enfin pouvoir annoncer à vos enfants, qui vous les réclamaient à cors et à cris, que les histoires d'Oli sont revenues. Voici une bonne surprise avec l'histoire d'un très très beau bébé racontée par Colas Gutman !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/2cd68264-1ffd-4010-8408-a5be0da53f69/19721-28.09.2020-ITEMA_22439963-2020F33264E0026-21.mp3" length="9874879" type="audio/mpeg"/>
      <guid isPermaLink="false">5fc750a9-22c4-4bfa-ac35-237190034719</guid>
      <pubDate>Mon, 28 Sep 2020 01:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0026</podcastRF:magnetothequeID>
      <itunes:title>"Jean-Bébé" </itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Jean-Bébé",</itunes:keywords>
      <itunes:subtitle>"Jean-Bébé" </itunes:subtitle>
      <itunes:summary>durée : 00:10:15 - Une histoire et... Oli - Quelle bonne nouvelle, vous allez enfin pouvoir annoncer à vos enfants, qui vous les réclamaient à cors et à cris, que les histoires d'Oli sont revenues. Voici une bonne surprise avec l'histoire d'un très très beau bébé racontée par Colas Gutman !</itunes:summary>
      <itunes:duration>00:10:15</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les baisers envoyés"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-baisers-envoyes-4592898</link>
      <description>durée : 00:11:36 - Une histoire et... Oli - Oli c'est : des histoires pour les petits dormeurs et les grands rêveurs, à écouter sans modération comme celle de Véronique Olmi qui nous raconte que quelquefois certaines expressions peuvent donner du chagrin si on en explique pas la significa</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/b4d86ec6-64a0-4b80-8594-825713dfef04/19721-28.09.2020-ITEMA_22439963-2020F33264E0025-21.mp3" length="11165098" type="audio/mpeg"/>
      <guid isPermaLink="false">e5916831-9166-4d97-8ee0-107aeeb042e9</guid>
      <pubDate>Mon, 28 Sep 2020 01:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0025</podcastRF:magnetothequeID>
      <itunes:title>"Les baisers envoyés"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,baisers,envoyés"</itunes:keywords>
      <itunes:subtitle>"Les baisers envoyés"</itunes:subtitle>
      <itunes:summary>durée : 00:11:36 - Une histoire et... Oli - Oli c'est : des histoires pour les petits dormeurs et les grands rêveurs, à écouter sans modération comme celle de Véronique Olmi qui nous raconte que quelquefois certaines expressions peuvent donner du chagrin si on en explique pas la significa</itunes:summary>
      <itunes:duration>00:11:36</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les fées des courgettes"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-fees-des-courgettes-7177634</link>
      <description>durée : 00:11:26 - Une histoire et... Oli - Noni n’aime plus son plat préféré, mais que se passe-t-il ? Découvrez "La féé des courgettes", le conte original signé par la chanteuse Olivia Ruiz. A écouter en famille !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a2e331c9-4d1d-432d-9f94-f4a8bbf0966c/19721-28.09.2020-ITEMA_22439963-2020F33264E0024-21.mp3" length="11003661" type="audio/mpeg"/>
      <guid isPermaLink="false">574488bd-21ee-4a55-aef3-a24a01fdfd74</guid>
      <pubDate>Mon, 28 Sep 2020 01:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0024</podcastRF:magnetothequeID>
      <itunes:title>"Les fées des courgettes"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,fées,des,courgettes"</itunes:keywords>
      <itunes:subtitle>"Les fées des courgettes"</itunes:subtitle>
      <itunes:summary>durée : 00:11:26 - Une histoire et... Oli - Noni n’aime plus son plat préféré, mais que se passe-t-il ? Découvrez "La féé des courgettes", le conte original signé par la chanteuse Olivia Ruiz. A écouter en famille !</itunes:summary>
      <itunes:duration>00:11:26</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La fable de l’enfant qui avait trop de choses à dire"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/sophie-fontanel-la-fable-de-l-enfant-qui-avait-trop-de-choses-a-dire-8584947</link>
      <description>durée : 00:08:22 - Une histoire et... Oli - Tobias a huit ans et même si on lui dit qu'il est trop petit pour comprendre la vie, il savait pleins de mots comme inculte, comme élégant ou aïeule mais il faisait exprès de ne rien dire. Il parlait à ses jouets, seulement à eux. Un conte écrit et raconté par Sophie Fontanel.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7e1ee9f1-d520-4de2-9e8e-76628f3683ce/19721-23.07.2020-ITEMA_22388000-2020F33264E0023-21.mp3" length="8066096" type="audio/mpeg"/>
      <guid isPermaLink="false">31f301f5-9185-4d18-9680-08c1ee312f26</guid>
      <pubDate>Thu, 23 Jul 2020 01:08:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0023</podcastRF:magnetothequeID>
      <itunes:title>"La fable de l’enfant qui avait trop de choses à dire"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,fable,de,l’enfant,qui,avait,trop,de,choses,à,dire"</itunes:keywords>
      <itunes:subtitle>"La fable de l’enfant qui avait trop de choses à dire"</itunes:subtitle>
      <itunes:summary>durée : 00:08:22 - Une histoire et... Oli - Tobias a huit ans et même si on lui dit qu'il est trop petit pour comprendre la vie, il savait pleins de mots comme inculte, comme élégant ou aïeule mais il faisait exprès de ne rien dire. Il parlait à ses jouets, seulement à eux. Un conte écrit et raconté par Sophie Fontanel.</itunes:summary>
      <itunes:duration>00:08:22</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Miss Mousse"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/marie-nimier-miss-mousse-2059774</link>
      <description>durée : 00:11:18 - Une histoire et... Oli - Vous cherchez des histoires à faire écouter à vos enfants ? Avant de se coucher, pour la sieste, allongés dans l’herbe, à la plage, dans la voiture ou dans le train, La solution est toute trouvée car Oli est de retour avec Miss Mousse racontée et imaginée par Marie Nimier.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/e6b894d9-f88e-47d7-8ece-b59d59a45e3b/19721-23.07.2020-ITEMA_22388000-2020F33264E0022-21.mp3" length="10886796" type="audio/mpeg"/>
      <guid isPermaLink="false">68c758d8-2326-4cb0-ae4d-de8599fd4adb</guid>
      <pubDate>Thu, 23 Jul 2020 01:06:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0022</podcastRF:magnetothequeID>
      <itunes:title>"Miss Mousse"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Miss,Mousse"</itunes:keywords>
      <itunes:subtitle>"Miss Mousse"</itunes:subtitle>
      <itunes:summary>durée : 00:11:18 - Une histoire et... Oli - Vous cherchez des histoires à faire écouter à vos enfants ? Avant de se coucher, pour la sieste, allongés dans l’herbe, à la plage, dans la voiture ou dans le train, La solution est toute trouvée car Oli est de retour avec Miss Mousse racontée et imaginée par Marie Nimier.</itunes:summary>
      <itunes:duration>00:11:18</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Jeannette et les fées du temps qu’il fait"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/marie-pierre-planchon-jeannette-et-les-fees-du-temps-qu-il-fait-8085761</link>
      <description>durée : 00:12:10 - Une histoire et... Oli - Vos enfants, petits-enfants, neveux, nièces, adorent que l’on leur raconte des histoires ? La nouvelle série audio de France Inter Oli est faite pour eux car les auteurs ont écrit l'histoire, et la raconte.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/5663f85e-ef36-496c-9b81-a3fc890e4d2c/19721-23.07.2020-ITEMA_22388000-2020F33264E0021-21.mp3" length="11718058" type="audio/mpeg"/>
      <guid isPermaLink="false">dba9451a-446a-46b1-aa54-b3355890436b</guid>
      <pubDate>Thu, 23 Jul 2020 01:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0021</podcastRF:magnetothequeID>
      <itunes:title>"Jeannette et les fées du temps qu’il fait"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Jeannette,et,les,fées,du,temps,qu’il,fait"</itunes:keywords>
      <itunes:subtitle>"Jeannette et les fées du temps qu’il fait"</itunes:subtitle>
      <itunes:summary>durée : 00:12:10 - Une histoire et... Oli - Vos enfants, petits-enfants, neveux, nièces, adorent que l’on leur raconte des histoires ? La nouvelle série audio de France Inter Oli est faite pour eux car les auteurs ont écrit l'histoire, et la raconte.</itunes:summary>
      <itunes:duration>00:12:10</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L’histoire d’Ava et Ivanhoé"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/arthur-h-l-histoire-d-ava-et-ivanhoe-1338604</link>
      <description>durée : 00:12:30 - Une histoire et... Oli - Une histoire et Oli avec Arthur H qui va vous raconter "L’histoire d’Ava et Ivanhoé", tout un programme et à faire écouter sans modération.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/119862e3-98f8-4051-8d35-156c99cc73db/19721-23.07.2020-ITEMA_22388000-2020F33264E0019-21.mp3" length="12025514" type="audio/mpeg"/>
      <guid isPermaLink="false">1dcd848e-875e-4808-8712-ff5cc5226697</guid>
      <pubDate>Thu, 23 Jul 2020 01:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0019</podcastRF:magnetothequeID>
      <itunes:title>"L’histoire d’Ava et Ivanhoé"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L’histoire,d’Ava,et,Ivanhoé"</itunes:keywords>
      <itunes:subtitle>"L’histoire d’Ava et Ivanhoé"</itunes:subtitle>
      <itunes:summary>durée : 00:12:30 - Une histoire et... Oli - Une histoire et Oli avec Arthur H qui va vous raconter "L’histoire d’Ava et Ivanhoé", tout un programme et à faire écouter sans modération.</itunes:summary>
      <itunes:duration>00:12:30</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le peintre qui volait la couleur des choses"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/miguel-bonnefoy-le-peintre-qui-volait-la-couleur-des-choses-2192300</link>
      <description>durée : 00:08:55 - Une histoire et... Oli - Avec Oli, vous allez pouvoir profiter de moments privilégiés pendant les vacances avec vos enfants en écoutant les contes avec eux, ou en échangeant sur la façon dont ils ont compris les histoires.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/66d86bfe-eb6e-4e4d-83af-fbbf1bd6778f/19721-23.07.2020-ITEMA_22388000-2020F33264E0020-21.mp3" length="8597513" type="audio/mpeg"/>
      <guid isPermaLink="false">146eb6fc-047a-44c5-9e06-2d9526a87e4a</guid>
      <pubDate>Thu, 23 Jul 2020 01:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0020</podcastRF:magnetothequeID>
      <itunes:title>"Le peintre qui volait la couleur des choses"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,peintre,qui,volait,la,couleur,des,choses"</itunes:keywords>
      <itunes:subtitle>"Le peintre qui volait la couleur des choses"</itunes:subtitle>
      <itunes:summary>durée : 00:08:55 - Une histoire et... Oli - Avec Oli, vous allez pouvoir profiter de moments privilégiés pendant les vacances avec vos enfants en écoutant les contes avec eux, ou en échangeant sur la façon dont ils ont compris les histoires.</itunes:summary>
      <itunes:duration>00:08:55</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La vie secrète de Doudou Lapin"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-vie-secrete-de-doudou-lapin-1675190</link>
      <description>durée : 00:09:09 - Une histoire et... Oli - Vos enfants (et avouez-le, vous aussi) attendaient avec impatience un nouvel épisode d'Oli, la série audio de France Inter, et bonne nouvelle, le voici avec un joli texte de Julien Blanc-Gras.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/69cef0af-3cb7-43d9-b4b9-75c617a878d4/19721-28.04.2020-ITEMA_22331422-2020F33264E0017-21.mp3" length="8813640" type="audio/mpeg"/>
      <guid isPermaLink="false">26eb24c5-cf64-431e-8ae7-23aa7cde1880</guid>
      <pubDate>Tue, 28 Apr 2020 10:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0017</podcastRF:magnetothequeID>
      <itunes:title>"La vie secrète de Doudou Lapin"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,vie,secrète,de,Doudou,Lapin"</itunes:keywords>
      <itunes:subtitle>"La vie secrète de Doudou Lapin"</itunes:subtitle>
      <itunes:summary>durée : 00:09:09 - Une histoire et... Oli - Vos enfants (et avouez-le, vous aussi) attendaient avec impatience un nouvel épisode d'Oli, la série audio de France Inter, et bonne nouvelle, le voici avec un joli texte de Julien Blanc-Gras.</itunes:summary>
      <itunes:duration>00:09:09</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le Prince oublié et la sorcière malfaisante"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-prince-oublie-et-la-sorciere-malfaisante-2080049</link>
      <description>durée : 00:08:49 - Une histoire et... Oli - Dès le plus jeune âge, il est important de développer son sens de l’écoute et c’est pourquoi les podcasts Oli de France Inter, à destination des jeunes enfants, rencontrent autant de succès. Une belle aventure qui continue avec cette nouvelle histoire.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/f60f8bde-a72e-4c9c-90c5-0480f4541c74/19721-18.02.2020-ITEMA_22285929-2020F33264E0016-21.mp3" length="8487750" type="audio/mpeg"/>
      <guid isPermaLink="false">76880e63-636b-452a-a1a5-61a408a6f106</guid>
      <pubDate>Tue, 18 Feb 2020 01:08:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0016</podcastRF:magnetothequeID>
      <itunes:title>"Le Prince oublié et la sorcière malfaisante"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,Prince,oublié,et,la,sorcière,malfaisante"</itunes:keywords>
      <itunes:subtitle>"Le Prince oublié et la sorcière malfaisante"</itunes:subtitle>
      <itunes:summary>durée : 00:08:49 - Une histoire et... Oli - Dès le plus jeune âge, il est important de développer son sens de l’écoute et c’est pourquoi les podcasts Oli de France Inter, à destination des jeunes enfants, rencontrent autant de succès. Une belle aventure qui continue avec cette nouvelle histoire.</itunes:summary>
      <itunes:duration>00:08:49</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Taly, la p'tite souris"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/taly-la-p-tite-souris-8411039</link>
      <description>durée : 00:08:02 - Une histoire et... Oli - France Inter propose à plusieurs auteurs d’écrire et de raconter une histoire pour vos enfants… Voici donc“Oli”, podcast original à, destination des plus jeunes. Découvrez le conte imaginé par l'écrivaine, Karine Tuil, une histoire bien connue, celle de la petite souris des dents sous l'oreiller...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/e89e0a9f-80b4-4611-9787-4558ef92cf77/19721-18.02.2020-ITEMA_22285929-2020F33264E0015-21.mp3" length="7738373" type="audio/mpeg"/>
      <guid isPermaLink="false">1edb8f4d-e884-4079-a4a3-68484ece75a3</guid>
      <pubDate>Tue, 18 Feb 2020 01:06:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0015</podcastRF:magnetothequeID>
      <itunes:title>"Taly, la p'tite souris"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Taly,,la,p'tite,souris"</itunes:keywords>
      <itunes:subtitle>"Taly, la p'tite souris"</itunes:subtitle>
      <itunes:summary>durée : 00:08:02 - Une histoire et... Oli - France Inter propose à plusieurs auteurs d’écrire et de raconter une histoire pour vos enfants… Voici donc“Oli”, podcast original à, destination des plus jeunes. Découvrez le conte imaginé par l'écrivaine, Karine Tuil, une histoire bien connue, celle de la petite souris des dents sous l'oreiller...</itunes:summary>
      <itunes:duration>00:08:02</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les papiers d'Omar"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-papiers-d-omar-6858920</link>
      <description>durée : 00:09:33 - Une histoire et... Oli - Chic, chic, Oli, le podcast original à écouter en ligne et disponible en téléchargement, revient avec des histoires à écouter sans modération, pour vous les parents et pour vos enfants.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/269cbcb7-d19c-4b5c-8cbd-5a36829fb46e/19721-18.02.2020-ITEMA_22285929-2020F33264E0014-21.mp3" length="9201417" type="audio/mpeg"/>
      <guid isPermaLink="false">fa0bf0dc-e281-4fad-abf7-3172ceab75c1</guid>
      <pubDate>Tue, 18 Feb 2020 01:04:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0014</podcastRF:magnetothequeID>
      <itunes:title>"Les papiers d'Omar"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,papiers,d'Omar"</itunes:keywords>
      <itunes:subtitle>"Les papiers d'Omar"</itunes:subtitle>
      <itunes:summary>durée : 00:09:33 - Une histoire et... Oli - Chic, chic, Oli, le podcast original à écouter en ligne et disponible en téléchargement, revient avec des histoires à écouter sans modération, pour vous les parents et pour vos enfants.</itunes:summary>
      <itunes:duration>00:09:33</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Luna à Manhattan"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/luna-a-manhattan-4297258</link>
      <description>durée : 00:12:26 - Une histoire et... Oli - Parmi les auteurs d'Oli, notre podcast original destiné aux enfants, voici la poétesse et romancière Zoé Valdès, pour laquelle "écrire, c'est avoir un pied dans la Lune, un pied sur la Terre".</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/e5dbffa7-eac2-4421-bd1a-5e4e9fe40abf/19721-18.02.2020-ITEMA_22285929-2020F33264E0013-21.mp3" length="11967086" type="audio/mpeg"/>
      <guid isPermaLink="false">fcd61923-e3d7-4180-9d7c-8784cded6f8c</guid>
      <pubDate>Tue, 18 Feb 2020 01:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0013</podcastRF:magnetothequeID>
      <itunes:title>"Luna à Manhattan"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Luna,à,Manhattan"</itunes:keywords>
      <itunes:subtitle>"Luna à Manhattan"</itunes:subtitle>
      <itunes:summary>durée : 00:12:26 - Une histoire et... Oli - Parmi les auteurs d'Oli, notre podcast original destiné aux enfants, voici la poétesse et romancière Zoé Valdès, pour laquelle "écrire, c'est avoir un pied dans la Lune, un pied sur la Terre".</itunes:summary>
      <itunes:duration>00:12:26</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le secret des parents"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-secret-des-parents-6250225</link>
      <description>durée : 00:12:14 - Une histoire et... Oli - Pourquoi les grandes personnes sont-elles si méchantes avec les enfants ? Le petit Kleber ne cesse de s’interroger. Jusqu’à ce qu’un jour, sa grand-mère lui révèle un secret : si les adultes sont si grognons, c’est parce qu’eux-mêmes ont oublié qu’ils étaient autrefois des enfants.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/c9e5d9ae-6fca-458a-927f-0e56fef59547/19721-18.02.2020-ITEMA_22285929-2020F33264E0012-21.mp3" length="11776659" type="audio/mpeg"/>
      <guid isPermaLink="false">65d35372-e1e1-4e59-a21c-655c5e51b6cc</guid>
      <pubDate>Tue, 18 Feb 2020 01:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2020F33264E0012</podcastRF:magnetothequeID>
      <itunes:title>"Le secret des parents"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,secret,des,parents"</itunes:keywords>
      <itunes:subtitle>"Le secret des parents"</itunes:subtitle>
      <itunes:summary>durée : 00:12:14 - Une histoire et... Oli - Pourquoi les grandes personnes sont-elles si méchantes avec les enfants ? Le petit Kleber ne cesse de s’interroger. Jusqu’à ce qu’un jour, sa grand-mère lui révèle un secret : si les adultes sont si grognons, c’est parce qu’eux-mêmes ont oublié qu’ils étaient autrefois des enfants.</itunes:summary>
      <itunes:duration>00:12:14</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le réseau du Père Noël"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-reseau-du-pere-noel-4957724</link>
      <description>durée : 00:09:11 - Une histoire et... Oli - François Morel vous invite pour un voyage en Laponie, afin d'aller à la rencontre du père et de la mère Noël une semaine après la nuit où il a livré tous ses cadeaux. Bien sûr tout continuait à briller, le paysage était encore d'un blanc éblouissant, tout était calme et silencieux...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/84cfcde3-cad0-4a37-bfa7-66c68bd73bf6/19721-17.12.2019-ITEMA_22232156-2019F33264E0011-21.mp3" length="8842199" type="audio/mpeg"/>
      <guid isPermaLink="false">ece2a7ef-6edf-4909-93cf-47a12854b7fb</guid>
      <pubDate>Tue, 17 Dec 2019 01:10:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0011</podcastRF:magnetothequeID>
      <itunes:title>"Le réseau du Père Noël"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,réseau,du,Père,Noël"</itunes:keywords>
      <itunes:subtitle>"Le réseau du Père Noël"</itunes:subtitle>
      <itunes:summary>durée : 00:09:11 - Une histoire et... Oli - François Morel vous invite pour un voyage en Laponie, afin d'aller à la rencontre du père et de la mère Noël une semaine après la nuit où il a livré tous ses cadeaux. Bien sûr tout continuait à briller, le paysage était encore d'un blanc éblouissant, tout était calme et silencieux...</itunes:summary>
      <itunes:duration>00:09:11</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La petite patate qui voulait être un chien féroce"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-petite-patate-qui-voulait-etre-un-chien-feroce-3955884</link>
      <description>durée : 00:10:07 - Une histoire et... Oli - Nicole Ferroni rejoint à son tour la nouvelle série audio de France Inter "Oli" en vous proposant de vivre cette formidable rencontre, entre une petite patate et le chien du paysan, celui-là même qui veille à prendre soin du champ dans lequel les deux personnages...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/b6493d75-c5d8-44b9-969c-ca30bc3d5922/19721-17.12.2019-ITEMA_22232156-2019F33264E0010-21.mp3" length="9748353" type="audio/mpeg"/>
      <guid isPermaLink="false">602a7891-92b2-47c0-ba6e-303eefe1acea</guid>
      <pubDate>Tue, 17 Dec 2019 01:08:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0010</podcastRF:magnetothequeID>
      <itunes:title>"La petite patate qui voulait être un chien féroce"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,petite,patate,qui,voulait,être,un,chien,féroce"</itunes:keywords>
      <itunes:subtitle>"La petite patate qui voulait être un chien féroce"</itunes:subtitle>
      <itunes:summary>durée : 00:10:07 - Une histoire et... Oli - Nicole Ferroni rejoint à son tour la nouvelle série audio de France Inter "Oli" en vous proposant de vivre cette formidable rencontre, entre une petite patate et le chien du paysan, celui-là même qui veille à prendre soin du champ dans lequel les deux personnages...</itunes:summary>
      <itunes:duration>00:10:07</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Baïla, la petite Louve" </title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/adeline-dieudonne-baila-la-petite-louve-7275180</link>
      <description>durée : 00:11:48 - Une histoire et... Oli - Vos enfants aiment qu’on leur raconte des histoires ? La série audio de France Inter "Oli" est de retour ! Idéale pour ces soirées d'hiver, bien au chaud et se retrouver pour de bons moments.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/497b0889-a2b1-4740-93a9-eb33cbb14fe9/19721-17.12.2019-ITEMA_22232156-2019F33264E0009-21.mp3" length="11355622" type="audio/mpeg"/>
      <guid isPermaLink="false">69bfc142-94d4-4ada-b038-3f98927ce9db</guid>
      <pubDate>Tue, 17 Dec 2019 01:06:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0009</podcastRF:magnetothequeID>
      <itunes:title>"Baïla, la petite Louve" </itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Baïla,,la,petite,Louve",</itunes:keywords>
      <itunes:subtitle>"Baïla, la petite Louve" </itunes:subtitle>
      <itunes:summary>durée : 00:11:48 - Une histoire et... Oli - Vos enfants aiment qu’on leur raconte des histoires ? La série audio de France Inter "Oli" est de retour ! Idéale pour ces soirées d'hiver, bien au chaud et se retrouver pour de bons moments.</itunes:summary>
      <itunes:duration>00:11:48</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Constance veut changer le monde"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/valerie-zenatti-constance-veut-changer-le-monde-5464822</link>
      <description>durée : 00:11:51 - Une histoire et... Oli - Pour les enfants, pour celles et ceux qui le sont restés, pour se divertir, comprendre ou s'endormir bercé par de belles histoires, voici la nouvelle série audio de France Inter "Oli".</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/1a06570f-61bb-4054-ab62-93f1febdb3df/19721-17.12.2019-ITEMA_22232156-2019F33264E0008-21.mp3" length="11407833" type="audio/mpeg"/>
      <guid isPermaLink="false">facda0ae-226d-4b11-9f30-3ad59b78496e</guid>
      <pubDate>Tue, 17 Dec 2019 01:04:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0008</podcastRF:magnetothequeID>
      <itunes:title>"Constance veut changer le monde"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Constance,veut,changer,le,monde"</itunes:keywords>
      <itunes:subtitle>"Constance veut changer le monde"</itunes:subtitle>
      <itunes:summary>durée : 00:11:51 - Une histoire et... Oli - Pour les enfants, pour celles et ceux qui le sont restés, pour se divertir, comprendre ou s'endormir bercé par de belles histoires, voici la nouvelle série audio de France Inter "Oli".</itunes:summary>
      <itunes:duration>00:11:51</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le marchand d'amis"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/eric-emmanuel-schmitt-le-marchand-d-ami-7892617</link>
      <description>durée : 00:12:52 - Une histoire et... Oli - Pour sauver vos voyages en voiture, distraire vos enfants sans écran ou juste parfaire une séance coloriage à la maison un jour de pluie, rien de tel que des histoires, en plus, elles sont racontées par les auteurs et c'est dans la nouvelle série d'épisodes audio de notre podcast "Oli".</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/3800abae-89dc-4101-bc95-ba001052d5bd/19721-17.12.2019-ITEMA_22232156-2019F33264E0007-21.mp3" length="12388561" type="audio/mpeg"/>
      <guid isPermaLink="false">9c9c89cf-4e78-418d-ad1f-63c657a125bc</guid>
      <pubDate>Tue, 17 Dec 2019 01:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0007</podcastRF:magnetothequeID>
      <itunes:title>"Le marchand d'amis"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,marchand,d'amis"</itunes:keywords>
      <itunes:subtitle>"Le marchand d'amis"</itunes:subtitle>
      <itunes:summary>durée : 00:12:52 - Une histoire et... Oli - Pour sauver vos voyages en voiture, distraire vos enfants sans écran ou juste parfaire une séance coloriage à la maison un jour de pluie, rien de tel que des histoires, en plus, elles sont racontées par les auteurs et c'est dans la nouvelle série d'épisodes audio de notre podcast "Oli".</itunes:summary>
      <itunes:duration>00:12:52</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le Lapin Shérif"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/olivier-norek-le-lapin-sherif-6898099</link>
      <description>durée : 00:10:21 - Une histoire et... Oli - Vos enfants et petits-enfants sont friands de lecture ? La série audio de France Inter "Oli" est faite pour eux : les auteurs ont écrit l'histoire et la raconte.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/cfc6eb32-f17f-4dd9-8841-2f6ddb6f4547/19721-17.12.2019-ITEMA_22232156-2019F33264E0006-21.mp3" length="9962071" type="audio/mpeg"/>
      <guid isPermaLink="false">a153971e-4602-4c77-af19-ca0d8429a491</guid>
      <pubDate>Tue, 17 Dec 2019 01:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0006</podcastRF:magnetothequeID>
      <itunes:title>"Le Lapin Shérif"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,Lapin,Shérif"</itunes:keywords>
      <itunes:subtitle>"Le Lapin Shérif"</itunes:subtitle>
      <itunes:summary>durée : 00:10:21 - Une histoire et... Oli - Vos enfants et petits-enfants sont friands de lecture ? La série audio de France Inter "Oli" est faite pour eux : les auteurs ont écrit l'histoire et la raconte.</itunes:summary>
      <itunes:duration>00:10:21</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Babouchka Babachka"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pour-oli-guillaume-gallienne-et-estelle-gapp-babouchka-babachka-5720044</link>
      <description>durée : 00:08:08 - Une histoire et... Oli - Ils travaillent ensemble depuis 10 ans. Guillaume Gallienne et Estelle Gapp ont eu envie de nous raconter une histoire, celle qu'ils aimeraient raconter à leurs enfants, alors pour la nouvelle série audio de France Inter OLI, voici "Babouchka Babachka".</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ce2a6c49-8e16-425b-b1ef-1be62804319d/19721-15.10.2019-ITEMA_22176330-2019F33264E0005-21.mp3" length="7844438" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2019-ITEMA_22176330-2019F33264E0005-21.mp3</guid>
      <pubDate>Tue, 15 Oct 2019 01:08:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0005</podcastRF:magnetothequeID>
      <itunes:title>"Babouchka Babachka"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Babouchka,Babachka"</itunes:keywords>
      <itunes:subtitle>"Babouchka Babachka"</itunes:subtitle>
      <itunes:summary>durée : 00:08:08 - Une histoire et... Oli - Ils travaillent ensemble depuis 10 ans. Guillaume Gallienne et Estelle Gapp ont eu envie de nous raconter une histoire, celle qu'ils aimeraient raconter à leurs enfants, alors pour la nouvelle série audio de France Inter OLI, voici "Babouchka Babachka".</itunes:summary>
      <itunes:duration>00:08:08</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le monsieur qui avait une grosse voix"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pour-oli-lewis-trondheim-le-monsieur-qui-avait-une-grosse-voix-2741041</link>
      <description>durée : 00:08:04 - Une histoire et... Oli - Une histoire et Oli, ce sont des contes "imaginés et racontés"  par cinq auteurs, cinq voix. Bonne transition pour vous donner envie de découvrir "Le monsieur qui avait une grosse voix" avec et par Lewis Trondheim.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/89f1f8c3-14a6-4300-b537-46600ddb3e6b/19721-15.10.2019-ITEMA_22176330-2019F33264E0004-21.mp3" length="7775835" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2019-ITEMA_22176330-2019F33264E0004-21.mp3</guid>
      <pubDate>Tue, 15 Oct 2019 01:06:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0004</podcastRF:magnetothequeID>
      <itunes:title>"Le monsieur qui avait une grosse voix"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,monsieur,qui,avait,une,grosse,voix"</itunes:keywords>
      <itunes:subtitle>"Le monsieur qui avait une grosse voix"</itunes:subtitle>
      <itunes:summary>durée : 00:08:04 - Une histoire et... Oli - Une histoire et Oli, ce sont des contes "imaginés et racontés"  par cinq auteurs, cinq voix. Bonne transition pour vous donner envie de découvrir "Le monsieur qui avait une grosse voix" avec et par Lewis Trondheim.</itunes:summary>
      <itunes:duration>00:08:04</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Rainette, la grenouille qui détestait se laver les cheveux"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pour-oli-emmanuelle-bayamack-tam-rainette-la-grenouille-qui-detestait-se-laver-les-cheveux-2803377</link>
      <description>durée : 00:10:41 - Une histoire et... Oli - Découvrez les nouveaux épisodes de la série audio de France Inter : des contes pour les 5-7 ans, imaginés et racontés pour Oli comme  "Rainette, la grenouille qui détestait se laver les cheveux" par Emmanuelle Bayamack-Tam.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/a7ab2837-1e7f-4dfa-97ff-7d1e13fa7db8/19721-15.10.2019-ITEMA_22176330-2019F33264E0003-21.mp3" length="10294163" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2019-ITEMA_22176330-2019F33264E0003-21.mp3</guid>
      <pubDate>Tue, 15 Oct 2019 01:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0003</podcastRF:magnetothequeID>
      <itunes:title>"Rainette, la grenouille qui détestait se laver les cheveux"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Rainette,,la,grenouille,qui,détestait,se,laver,les,cheveux"</itunes:keywords>
      <itunes:subtitle>"Rainette, la grenouille qui détestait se laver les cheveux"</itunes:subtitle>
      <itunes:summary>durée : 00:10:41 - Une histoire et... Oli - Découvrez les nouveaux épisodes de la série audio de France Inter : des contes pour les 5-7 ans, imaginés et racontés pour Oli comme  "Rainette, la grenouille qui détestait se laver les cheveux" par Emmanuelle Bayamack-Tam.</itunes:summary>
      <itunes:duration>00:10:41</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L'otarie tarée"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pour-oli-cecile-coulon-l-otarie-taree-8165276</link>
      <description>durée : 00:08:01 - Une histoire et... Oli - Pour sauver vos voyages en voiture, distraire vos enfants sans écran ou juste parfaire une séance coloriage à la maison un jour de pluie, les podcasts OLI sont parfaits ! En plus, quand vous annoncerez à vos chères têtes blondes que l'histoire s'appelle "L'otarie tarée", le succès sera garanti.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/66af16e8-fa2d-40c0-b751-65a81023fb73/19721-15.10.2019-ITEMA_22176330-2019F33264E0002-21.mp3" length="7726254" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2019-ITEMA_22176330-2019F33264E0002-21.mp3</guid>
      <pubDate>Tue, 15 Oct 2019 01:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0002</podcastRF:magnetothequeID>
      <itunes:title>"L'otarie tarée"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L'otarie,tarée"</itunes:keywords>
      <itunes:subtitle>"L'otarie tarée"</itunes:subtitle>
      <itunes:summary>durée : 00:08:01 - Une histoire et... Oli - Pour sauver vos voyages en voiture, distraire vos enfants sans écran ou juste parfaire une séance coloriage à la maison un jour de pluie, les podcasts OLI sont parfaits ! En plus, quand vous annoncerez à vos chères têtes blondes que l'histoire s'appelle "L'otarie tarée", le succès sera garanti.</itunes:summary>
      <itunes:duration>00:08:01</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La petite fille qui avait peur des chiens et du vent dans les arbres"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/pour-oli-veronique-ovalde-raconte-la-petite-fille-qui-avait-peur-des-chiens-et-du-vent-dans-les-arbres-9180364</link>
      <description>durée : 00:08:26 - Une histoire et... Oli - Les petits (les grands aussi …) adorent qu’on leur raconte des histoires, et même si on aime leur lire des livres, on ne peut pas non plus le faire toute la journée, alors n’hésitez pas Oli vous donne l’occasion de découvrir la jolie histoire d’Anabella par Véronique Ovaldé.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/0d145179-6616-43a9-b286-4d782779c058/19721-15.10.2019-ITEMA_22176330-2019F33264E0001-21.mp3" length="8125400" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2019-ITEMA_22176330-2019F33264E0001-21.mp3</guid>
      <pubDate>Tue, 15 Oct 2019 01:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264E0001</podcastRF:magnetothequeID>
      <itunes:title>"La petite fille qui avait peur des chiens et du vent dans les arbres"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,petite,fille,qui,avait,peur,des,chiens,et,du,vent,dans,les,arbres"</itunes:keywords>
      <itunes:subtitle>"La petite fille qui avait peur des chiens et du vent dans les arbres"</itunes:subtitle>
      <itunes:summary>durée : 00:08:26 - Une histoire et... Oli - Les petits (les grands aussi …) adorent qu’on leur raconte des histoires, et même si on aime leur lire des livres, on ne peut pas non plus le faire toute la journée, alors n’hésitez pas Oli vous donne l’occasion de découvrir la jolie histoire d’Anabella par Véronique Ovaldé.</itunes:summary>
      <itunes:duration>00:08:26</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>L'histoire du monstre du Loch Ness</title>
      <link>https://www.franceinter.fr/</link>
      <description>durée : 00:13:27 - L'histoire du monstre du Loch Ness - </description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family </category>
      <enclosure url="https://rf.proxycast.org/546117ed-1c91-4f20-b455-0ac40a811b43/19721-10.07.2019-ITEMA_22107234-2019F35387E4175-21.mp3" length="12808133" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-10.07.2019-ITEMA_22107234-2.mp3</guid>
      <pubDate>Wed, 10 Jul 2019 04:04:00 +0200</pubDate>
      <podcastRF:businessReference>35387</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F35387E4175</podcastRF:magnetothequeID>
      <itunes:title>L'histoire du monstre du Loch Ness</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>L'histoire,du,monstre,du,Loch,Ness</itunes:keywords>
      <itunes:subtitle>L'histoire du monstre du Loch Ness</itunes:subtitle>
      <itunes:summary>durée : 00:13:27 - L'histoire du monstre du Loch Ness - </itunes:summary>
      <itunes:duration>00:13:19</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>La découverte du tombeau de Toutankhamon</title>
      <link>https://www.franceinter.fr/</link>
      <description>durée : 00:11:03 - La découverte du tombeau de Toutankhamon - par Laure Grandbesançon - Cette histoire permet de vivre la découverte du tombeau de Toutankhamon, le onzième pharaon de la XVIII? dynastie, période apogée de la civilisation égyptienne antique. La découverte de la momie en 1922 revient à l'archéologue Howard Carter et Lord Carnavon, un égyptologue britannique.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family </category>
      <enclosure url="https://rf.proxycast.org/309ef9d0-bc33-4d6c-a2da-ba2bb9ecdb52/19721-10.07.2019-ITEMA_22107234-2019F35387E9175-21.mp3" length="10511511" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-10.07.2019-ITEMA_22107234-1.mp3</guid>
      <pubDate>Wed, 10 Jul 2019 04:02:00 +0200</pubDate>
      <podcastRF:businessReference>35387</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F35387E9175</podcastRF:magnetothequeID>
      <itunes:title>La découverte du tombeau de Toutankhamon</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>La,découverte,du,tombeau,de,Toutankhamon</itunes:keywords>
      <itunes:subtitle>La découverte du tombeau de Toutankhamon</itunes:subtitle>
      <itunes:summary>durée : 00:11:03 - La découverte du tombeau de Toutankhamon - par Laure Grandbesançon - Cette histoire permet de vivre la découverte du tombeau de Toutankhamon, le onzième pharaon de la XVIII? dynastie, période apogée de la civilisation égyptienne antique. La découverte de la momie en 1922 revient à l'archéologue Howard Carter et Lord Carnavon, un égyptologue britannique.</itunes:summary>
      <itunes:duration>00:10:55</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Laure Grandbesançon présente "Les Odyssées" !</title>
      <link>https://www.franceinter.fr/</link>
      <description>durée : 00:00:41 - Laure Grandbesançon présente "Les Odyssées" ! - </description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family </category>
      <enclosure url="https://rf.proxycast.org/327f5db5-6b61-4d5e-8aac-a51760d909d2/19721-10.07.2019-ITEMA_22107234-2019F35387E0191-21.mp3" length="564317" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-10.07.2019-ITEMA_22107234-0.mp3</guid>
      <pubDate>Wed, 10 Jul 2019 04:00:00 +0200</pubDate>
      <podcastRF:businessReference>35387</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F35387E0191</podcastRF:magnetothequeID>
      <itunes:title>Laure Grandbesançon présente "Les Odyssées" !</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>Laure,Grandbesançon,présente,"Les,Odyssées",!</itunes:keywords>
      <itunes:subtitle>Laure Grandbesançon présente "Les Odyssées" !</itunes:subtitle>
      <itunes:summary>durée : 00:00:41 - Laure Grandbesançon présente "Les Odyssées" ! - </itunes:summary>
      <itunes:duration>00:00:33</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le loup qui préférait les carottes"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-loup-qui-preferait-les-carottes-7158128</link>
      <description>durée : 00:12:31 - Une histoire et... Oli - Il était une fois un jeune loup qui vivait dans la forêt avec son père et ses trois frères. Un soir, alors que Papa Loup avait passé deux heures aux fourneaux à faire mijoter le lapin qu’il avait attrapé plus tôt dans la journée, il appela la meute de sa grosse voix d’Alpha.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/4604a862-8ceb-4307-9d95-478b86f991d8/19721-17.06.2019-ITEMA_22090439-2019F33264S4168-21.mp3" length="12044611" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-17.06.2019-ITEMA_22090439-2019F33264S4168-21.mp3</guid>
      <pubDate>Mon, 17 Jun 2019 01:00:04 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S4168</podcastRF:magnetothequeID>
      <itunes:title>"Le loup qui préférait les carottes"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,loup,qui,préférait,les,carottes"</itunes:keywords>
      <itunes:subtitle>"Le loup qui préférait les carottes"</itunes:subtitle>
      <itunes:summary>durée : 00:12:31 - Une histoire et... Oli - Il était une fois un jeune loup qui vivait dans la forêt avec son père et ses trois frères. Un soir, alors que Papa Loup avait passé deux heures aux fourneaux à faire mijoter le lapin qu’il avait attrapé plus tôt dans la journée, il appela la meute de sa grosse voix d’Alpha.</itunes:summary>
      <itunes:duration>00:12:31</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La cabane"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-cabane-5424523</link>
      <description>durée : 00:09:06 - Une histoire et... Oli - Nadia adore l’été. Le dernier jour d’école, Maman prépare sa valise. Le lendemain, Mamie sonne à la porte, elle embrasse sa fille et elle emmène Nadia chez elle, en train. Papi les attend à la gare. Chaque année, Papi tresse une couronne de fleurs pour Nadia.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ebfd54ea-c273-4c45-b836-cf7064ee3a67/19721-17.06.2019-ITEMA_22090439-2019F33264S3168-21.mp3" length="8769387" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-17.06.2019-ITEMA_22090439-2019F33264S3168-21.mp3</guid>
      <pubDate>Mon, 17 Jun 2019 01:00:03 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S3168</podcastRF:magnetothequeID>
      <itunes:title>"La cabane"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,cabane"</itunes:keywords>
      <itunes:subtitle>"La cabane"</itunes:subtitle>
      <itunes:summary>durée : 00:09:06 - Une histoire et... Oli - Nadia adore l’été. Le dernier jour d’école, Maman prépare sa valise. Le lendemain, Mamie sonne à la porte, elle embrasse sa fille et elle emmène Nadia chez elle, en train. Papi les attend à la gare. Chaque année, Papi tresse une couronne de fleurs pour Nadia.</itunes:summary>
      <itunes:duration>00:09:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le chat Pompelair et l'assiette magique"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-chat-pompelair-et-l-assiette-magique-8077379</link>
      <description>durée : 00:09:06 - Une histoire et... Oli - L'histoire se déroule dans une petite rue perdue au milieu d'une grande ville. Dans cette rue vivait le chat Pompelair, un chat minuscule qui passait son temps à se plaindre et à manger. Mais il avait beau s'empiffrer, il restait maigre comme un coucou.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/810b3de6-59c2-405c-9bc2-a096929013fc/19721-17.06.2019-ITEMA_22090439-2019F33264S2168-21.mp3" length="8771910" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-17.06.2019-ITEMA_22090439-2019F33264S2168-21.mp3</guid>
      <pubDate>Mon, 17 Jun 2019 01:00:02 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S2168</podcastRF:magnetothequeID>
      <itunes:title>"Le chat Pompelair et l'assiette magique"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,chat,Pompelair,et,l'assiette,magique"</itunes:keywords>
      <itunes:subtitle>"Le chat Pompelair et l'assiette magique"</itunes:subtitle>
      <itunes:summary>durée : 00:09:06 - Une histoire et... Oli - L'histoire se déroule dans une petite rue perdue au milieu d'une grande ville. Dans cette rue vivait le chat Pompelair, un chat minuscule qui passait son temps à se plaindre et à manger. Mais il avait beau s'empiffrer, il restait maigre comme un coucou.</itunes:summary>
      <itunes:duration>00:09:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Quand j’étais petit, je n’étais pas grand"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/quand-j-etais-petit-je-n-etais-pas-grand-5780840</link>
      <description>durée : 00:07:10 - Une histoire et... Oli - On le sait animateur de radio et de télévision, cinéaste, acteur, scénariste, et écrivain. On connaît ses passions pour la musique, les mots, l’humour, et les formes de culture les plus inattendues. Désormais, il faut ajouter Conteur avec un C majuscule. Antoine de Caunes reste lui-même, créatif, excentrique, joyeux et libre !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/dfbaa688-6cad-4ae3-a981-530375d18a25/19721-17.06.2019-ITEMA_22090439-2019F33264S1168-21.mp3" length="6916787" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-17.06.2019-ITEMA_22090439-2019F33264S1168-21.mp3</guid>
      <pubDate>Mon, 17 Jun 2019 01:00:01 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S1168</podcastRF:magnetothequeID>
      <itunes:title>"Quand j’étais petit, je n’étais pas grand"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Quand,j’étais,petit,,je,n’étais,pas,grand"</itunes:keywords>
      <itunes:subtitle>"Quand j’étais petit, je n’étais pas grand"</itunes:subtitle>
      <itunes:summary>durée : 00:07:10 - Une histoire et... Oli - On le sait animateur de radio et de télévision, cinéaste, acteur, scénariste, et écrivain. On connaît ses passions pour la musique, les mots, l’humour, et les formes de culture les plus inattendues. Désormais, il faut ajouter Conteur avec un C majuscule. Antoine de Caunes reste lui-même, créatif, excentrique, joyeux et libre !</itunes:summary>
      <itunes:duration>00:07:10</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le poisson d'argent"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-poisson-d-argent-8506573</link>
      <description>durée : 00:12:06 - Une histoire et... Oli - C’est une île qui n’existe plus, mais on a écrit son histoire. On l’appelait l’île miraculeuse. Nul ne savait comment elle avait surgi des eaux et nul ne connaissait son nom véritable. Elle était comparable à toutes ces choses que l’on ne peut  expliquer mais qui existent et font rêver.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/d71bf54a-e23f-4f23-96b3-e38d956141ce/19721-17.06.2019-ITEMA_22090439-2019F33264S0168-21.mp3" length="11651281" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-17.06.2019-ITEMA_22090439-2019F33264S0168-21.mp3</guid>
      <pubDate>Mon, 17 Jun 2019 01:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S0168</podcastRF:magnetothequeID>
      <itunes:title>"Le poisson d'argent"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,poisson,d'argent"</itunes:keywords>
      <itunes:subtitle>"Le poisson d'argent"</itunes:subtitle>
      <itunes:summary>durée : 00:12:06 - Une histoire et... Oli - C’est une île qui n’existe plus, mais on a écrit son histoire. On l’appelait l’île miraculeuse. Nul ne savait comment elle avait surgi des eaux et nul ne connaissait son nom véritable. Elle était comparable à toutes ces choses que l’on ne peut  expliquer mais qui existent et font rêver.</itunes:summary>
      <itunes:duration>00:12:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le petit Breton et le lama qui cherchait ses lunettes"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-petit-breton-et-le-lama-qui-cherchait-ses-lunettes-1837934</link>
      <description>durée : 00:09:04 - Une histoire et... Oli - France Inter propose à différents auteurs d’inventer et de raconter une histoire pour les enfants… C’est le projet “Oli”, un podcast original destiné aux enfants. Découvrez le conte imaginé par Jean Lebrun.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/4ae9c5a3-b55f-4a42-9cb9-5ccf856e09e5/19721-20.02.2019-ITEMA_21985925-2019F33264S0439-21.mp3" length="8739647" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-20.02.2019-ITEMA_21985925-2019F33264S0439-21.mp3</guid>
      <pubDate>Wed, 20 Feb 2019 04:08:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S0439</podcastRF:magnetothequeID>
      <itunes:title>"Le petit Breton et le lama qui cherchait ses lunettes"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,petit,Breton,et,le,lama,qui,cherchait,ses,lunettes"</itunes:keywords>
      <itunes:subtitle>"Le petit Breton et le lama qui cherchait ses lunettes"</itunes:subtitle>
      <itunes:summary>durée : 00:09:04 - Une histoire et... Oli - France Inter propose à différents auteurs d’inventer et de raconter une histoire pour les enfants… C’est le projet “Oli”, un podcast original destiné aux enfants. Découvrez le conte imaginé par Jean Lebrun.</itunes:summary>
      <itunes:duration>00:09:04</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La petite souris de nuit"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-petite-souris-de-nuit-4440410</link>
      <description>durée : 00:11:39 - Une histoire et... Oli - France Inter propose à différents auteurs d’inventer et de raconter une histoire pour les enfants… C’est le projet “Oli”, un podcast original destiné aux enfants. Découvrez l'histoire imaginée par Susie Morgenstern</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/fb4371fa-0038-46cb-ac63-a5ffb27a283c/19721-20.02.2019-ITEMA_21985925-2019F33264S0339-21.mp3" length="11212281" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-20.02.2019-ITEMA_21985925-2019F33264S0339-21.mp3</guid>
      <pubDate>Wed, 20 Feb 2019 04:06:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S0339</podcastRF:magnetothequeID>
      <itunes:title>"La petite souris de nuit"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,petite,souris,de,nuit"</itunes:keywords>
      <itunes:subtitle>"La petite souris de nuit"</itunes:subtitle>
      <itunes:summary>durée : 00:11:39 - Une histoire et... Oli - France Inter propose à différents auteurs d’inventer et de raconter une histoire pour les enfants… C’est le projet “Oli”, un podcast original destiné aux enfants. Découvrez l'histoire imaginée par Susie Morgenstern</itunes:summary>
      <itunes:duration>00:11:39</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Orso, les 4 géants et la petite ours"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/orso-les-4-geants-et-la-petite-ours-8269659</link>
      <description>durée : 00:09:38 - Une histoire et... Oli - Je m’appelle Orso. Ça veut dire ours en corse. Mes parents m’ont donné ce prénom parce qu’ils m’ont fabriqué là-bas, en Corse, il y a sept ans.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/2cb001e6-1668-4384-9ca5-971e7490b10b/19721-20.02.2019-ITEMA_21985925-2019F33264S0239-21.mp3" length="9274115" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-20.02.2019-ITEMA_21985925-2019F33264S0239-21.mp3</guid>
      <pubDate>Wed, 20 Feb 2019 04:04:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S0239</podcastRF:magnetothequeID>
      <itunes:title>"Orso, les 4 géants et la petite ours"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Orso,,les,4,géants,et,la,petite,ours"</itunes:keywords>
      <itunes:subtitle>"Orso, les 4 géants et la petite ours"</itunes:subtitle>
      <itunes:summary>durée : 00:09:38 - Une histoire et... Oli - Je m’appelle Orso. Ça veut dire ours en corse. Mes parents m’ont donné ce prénom parce qu’ils m’ont fabriqué là-bas, en Corse, il y a sept ans.</itunes:summary>
      <itunes:duration>00:09:38</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Boule de Neige, Roi des Alakaloufs"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/boule-de-neige-roi-des-alakaloufs-6241017</link>
      <description>durée : 00:09:20 - Une histoire et... Oli - Boule de neige naquit en Moselle une nuit de l’hiver 1914. Son père était un soldat africain et sa mère une fille de ferme. Le vrai nom du petit enfant était Felix qui veut dire « heureux » en latin mais on le surnomma « Boule de neige » parce qu’il était tout noir de peau, tout petit et qu’il avait sur la poitrine une petite tache blanche. Sa mère l’abandonna quelques jours après sa naissance et il fut élevé par une vieille nourrice du village de Tarquinpol.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ee8a0171-08a3-4fab-bafb-cec4c16b0e12/19721-20.02.2019-ITEMA_21985925-2019F33264S0139-21.mp3" length="8993008" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-20.02.2019-ITEMA_21985925-2019F33264S0139-21.mp3</guid>
      <pubDate>Wed, 20 Feb 2019 04:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S0139</podcastRF:magnetothequeID>
      <itunes:title>"Boule de Neige, Roi des Alakaloufs"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Boule,de,Neige,,Roi,des,Alakaloufs"</itunes:keywords>
      <itunes:subtitle>"Boule de Neige, Roi des Alakaloufs"</itunes:subtitle>
      <itunes:summary>durée : 00:09:20 - Une histoire et... Oli - Boule de neige naquit en Moselle une nuit de l’hiver 1914. Son père était un soldat africain et sa mère une fille de ferme. Le vrai nom du petit enfant était Felix qui veut dire « heureux » en latin mais on le surnomma « Boule de neige » parce qu’il était tout noir de peau, tout petit et qu’il avait sur la poitrine une petite tache blanche. Sa mère l’abandonna quelques jours après sa naissance et il fut élevé par une vieille nourrice du village de Tarquinpol.</itunes:summary>
      <itunes:duration>00:09:20</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Reiko et l'Ourson"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/reiko-et-l-ourson-9599625</link>
      <description>durée : 00:09:34 - Une histoire et... Oli - Il était une fois, sur une île lointaine, un petit garçon appelé Reiko. Cette île se situait tout au bout du monde, là où la mer s’arrête, là où les montagnes ouvrent sur le vide et les étoiles. La vie était rude sur l’île et les ressources y étaient rares.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/e76f0e29-ae81-4026-b925-9ab8197a1f98/19721-20.02.2019-ITEMA_21985925-2019F33264S0039-21.mp3" length="9210337" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-20.02.2019-ITEMA_21985925-2019F33264S0039-21.mp3</guid>
      <pubDate>Wed, 20 Feb 2019 04:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2019F33264S0039</podcastRF:magnetothequeID>
      <itunes:title>"Reiko et l'Ourson"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Reiko,et,l'Ourson"</itunes:keywords>
      <itunes:subtitle>"Reiko et l'Ourson"</itunes:subtitle>
      <itunes:summary>durée : 00:09:34 - Une histoire et... Oli - Il était une fois, sur une île lointaine, un petit garçon appelé Reiko. Cette île se situait tout au bout du monde, là où la mer s’arrête, là où les montagnes ouvrent sur le vide et les étoiles. La vie était rude sur l’île et les ressources y étaient rares.</itunes:summary>
      <itunes:duration>00:09:34</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les bonnes résolutions du Père Noël"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-bonnes-resolutions-du-pere-noel-7135454</link>
      <description>durée : 00:10:37 - Une histoire et... Oli - Le Père Noël est inquiet. Il a beau scruter le ciel chaque matin. La neige se fait attendre. La faute à la hausse des températures....</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/1c0fe572-f911-48da-82a1-7b70c8dc5989/19721-13.12.2018-ITEMA_21920513-2018F33264S4346-21.mp3" length="10224118" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-13.12.2018-ITEMA_21920513-2018F33264S4346-21.mp3</guid>
      <pubDate>Thu, 13 Dec 2018 04:08:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S4346</podcastRF:magnetothequeID>
      <itunes:title>"Les bonnes résolutions du Père Noël"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,bonnes,résolutions,du,Père,Noël"</itunes:keywords>
      <itunes:subtitle>"Les bonnes résolutions du Père Noël"</itunes:subtitle>
      <itunes:summary>durée : 00:10:37 - Une histoire et... Oli - Le Père Noël est inquiet. Il a beau scruter le ciel chaque matin. La neige se fait attendre. La faute à la hausse des températures....</itunes:summary>
      <itunes:duration>00:10:37</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La part des ancêtres"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-part-des-ancetres-6215660</link>
      <description>durée : 00:10:56 - Une histoire et... Oli - France Inter a lancé le projet Oli, une série de podcasts à destination des enfants, où des auteurs imaginent un conte original pour enfants et le racontent eux-mêmes au micro ! Pas question ici de ressortir des contes célèbres de Grimm ou Perrault...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/eb9ac004-b36b-47af-9984-27e0a6d61f94/19721-13.12.2018-ITEMA_21920513-2018F33264S3346-21.mp3" length="10522327" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-13.12.2018-ITEMA_21920513-2018F33264S3346-21.mp3</guid>
      <pubDate>Thu, 13 Dec 2018 04:06:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S3346</podcastRF:magnetothequeID>
      <itunes:title>"La part des ancêtres"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,part,des,ancêtres"</itunes:keywords>
      <itunes:subtitle>"La part des ancêtres"</itunes:subtitle>
      <itunes:summary>durée : 00:10:56 - Une histoire et... Oli - France Inter a lancé le projet Oli, une série de podcasts à destination des enfants, où des auteurs imaginent un conte original pour enfants et le racontent eux-mêmes au micro ! Pas question ici de ressortir des contes célèbres de Grimm ou Perrault...</itunes:summary>
      <itunes:duration>00:10:56</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"La chouette blanche"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/la-chouette-blanche-6700916</link>
      <description>durée : 00:09:17 - Une histoire et... Oli - Thomas, Mou, Quentin et Isis sont à l'école ensemble, ils ont sept ans. La jeune fille de la bande est une aventurière dans l'âme, elle aimerait bien faire des safaris à Paris. Ses copains, preux chevaliers tous un peu amoureux d'elle, l'accompagnent dans une virée nocturne...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7b205f51-dbdd-4c65-89fd-ced2e3edfe52/19721-13.12.2018-ITEMA_21920513-2018F33264S2346-21.mp3" length="8935242" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-13.12.2018-ITEMA_21920513-2018F33264S2346-21.mp3</guid>
      <pubDate>Thu, 13 Dec 2018 04:04:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S2346</podcastRF:magnetothequeID>
      <itunes:title>"La chouette blanche"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"La,chouette,blanche"</itunes:keywords>
      <itunes:subtitle>"La chouette blanche"</itunes:subtitle>
      <itunes:summary>durée : 00:09:17 - Une histoire et... Oli - Thomas, Mou, Quentin et Isis sont à l'école ensemble, ils ont sept ans. La jeune fille de la bande est une aventurière dans l'âme, elle aimerait bien faire des safaris à Paris. Ses copains, preux chevaliers tous un peu amoureux d'elle, l'accompagnent dans une virée nocturne...</itunes:summary>
      <itunes:duration>00:09:17</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Ozalee et Blu"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/ozalee-et-blu-9704090</link>
      <description>durée : 00:09:39 - Une histoire et... Oli - Comment, un soir à la veille de Noël, Ozalee a fait la connaissance de Blu, la petite bouloche... et comment leur Noël s'en est trouvé merveilleusement transformé !</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/5350e1ce-1d03-447f-b02d-f4b625f597b3/19721-13.12.2018-ITEMA_21920513-2018F33264S1346-21.mp3" length="9293319" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-13.12.2018-ITEMA_21920513-2018F33264S1346-21.mp3</guid>
      <pubDate>Thu, 13 Dec 2018 04:02:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S1346</podcastRF:magnetothequeID>
      <itunes:title>"Ozalee et Blu"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Ozalee,et,Blu"</itunes:keywords>
      <itunes:subtitle>"Ozalee et Blu"</itunes:subtitle>
      <itunes:summary>durée : 00:09:39 - Une histoire et... Oli - Comment, un soir à la veille de Noël, Ozalee a fait la connaissance de Blu, la petite bouloche... et comment leur Noël s'en est trouvé merveilleusement transformé !</itunes:summary>
      <itunes:duration>00:09:39</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Zelda et les abeilles"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/zelda-et-les-abeilles-9424927</link>
      <description>durée : 00:09:11 - Une histoire et... Oli - Zelda déteste les insectes. Surtout ceux qui font ZZZZ, justement. Elle déteste les guêpes, les bourdons, les frelons, les abeilles.  Elle les déteste, depuis toujours, depuis qu’elle sait que ces bestioles peuvent la piquer.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/ce1d37c9-6c18-4259-912a-d35fc1886925/19721-13.12.2018-ITEMA_21920513-2018F33264S0346-21.mp3" length="8846652" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-13.12.2018-ITEMA_21920513-2018F33264S0346-21.mp3</guid>
      <pubDate>Thu, 13 Dec 2018 04:00:00 +0100</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S0346</podcastRF:magnetothequeID>
      <itunes:title>"Zelda et les abeilles"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2023/03/185450b9-904b-4cf2-b3b9-f7a8b065ea47/1400x1400_sc_rf_omm_0000038202_ite.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Zelda,et,les,abeilles"</itunes:keywords>
      <itunes:subtitle>"Zelda et les abeilles"</itunes:subtitle>
      <itunes:summary>durée : 00:09:11 - Une histoire et... Oli - Zelda déteste les insectes. Surtout ceux qui font ZZZZ, justement. Elle déteste les guêpes, les bourdons, les frelons, les abeilles.  Elle les déteste, depuis toujours, depuis qu’elle sait que ces bestioles peuvent la piquer.</itunes:summary>
      <itunes:duration>00:09:11</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Opaque et Opaline"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/opaque-et-opaline-2696599</link>
      <description>durée : 00:11:52 - Une histoire et... Oli - Opaline la jument blanche et Opaque l’étalon noir sont les deux stars du Cirque Arc en Ciel. Sur la piste, leurs cabrioles émerveillent petits et grands. Mais une fois rentrés au box, ce n’est plus le même numéro : les deux canassons ne peuvent pas se supporter.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/4847ba84-ff61-4c16-95a9-9f2d9fa09aaf/19721-18.10.2018-ITEMA_21857935-2018F33264S1291-21.mp3" length="11428875" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-18.10.2018-ITEMA_21857935-2018F33264S1291-21.mp3</guid>
      <pubDate>Thu, 18 Oct 2018 05:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S1291</podcastRF:magnetothequeID>
      <itunes:title>"Opaque et Opaline"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Opaque,et,Opaline"</itunes:keywords>
      <itunes:subtitle>"Opaque et Opaline"</itunes:subtitle>
      <itunes:summary>durée : 00:11:52 - Une histoire et... Oli - Opaline la jument blanche et Opaque l’étalon noir sont les deux stars du Cirque Arc en Ciel. Sur la piste, leurs cabrioles émerveillent petits et grands. Mais une fois rentrés au box, ce n’est plus le même numéro : les deux canassons ne peuvent pas se supporter.</itunes:summary>
      <itunes:duration>00:11:52</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"L’invisible Max"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/l-invisible-max-6334677</link>
      <description>durée : 00:09:24 - Une histoire et... Oli - Ce matin est le pire matin de tous les temps pour Max : pour la première fois de sa vie, il doit aller à l’école. Et en plus, il doit y aller tout seul ! Max est très inquiet, il est sûr que dans la cour de récré, il n’y aura que des tireurs de cheveux, des voleurs de jouets.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/1ca50513-1577-4047-8210-de4f28c14582/19721-18.10.2018-ITEMA_21857935-2018F33264S0291-21.mp3" length="9051985" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-18.10.2018-ITEMA_21857935-2018F33264S0291-21.mp3</guid>
      <pubDate>Thu, 18 Oct 2018 05:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S0291</podcastRF:magnetothequeID>
      <itunes:title>"L’invisible Max"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"L’invisible,Max"</itunes:keywords>
      <itunes:subtitle>"L’invisible Max"</itunes:subtitle>
      <itunes:summary>durée : 00:09:24 - Une histoire et... Oli - Ce matin est le pire matin de tous les temps pour Max : pour la première fois de sa vie, il doit aller à l’école. Et en plus, il doit y aller tout seul ! Max est très inquiet, il est sûr que dans la cour de récré, il n’y aura que des tireurs de cheveux, des voleurs de jouets.</itunes:summary>
      <itunes:duration>00:09:24</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Les villages du Versant"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/les-villages-du-versant-7463292</link>
      <description>durée : 00:08:22 - Une histoire et... Oli - Une histoire d'antan au fin fond des contrées montagneuses de l'Italie. Une histoire qui chante l'accent du nord des Italiens. Une histoire de villages voisins sur deux versants. Une histoire un peu étonnante tout de même...</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/36a4163c-9bdd-4b4e-be3d-0e346bcede6d/19721-15.10.2018-ITEMA_21853234-2018F33264S3282-21.mp3" length="8068829" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2018-ITEMA_21853234-2018F33264S3282-21.mp3</guid>
      <pubDate>Mon, 15 Oct 2018 05:04:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S3282</podcastRF:magnetothequeID>
      <itunes:title>"Les villages du Versant"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Les,villages,du,Versant"</itunes:keywords>
      <itunes:subtitle>"Les villages du Versant"</itunes:subtitle>
      <itunes:summary>durée : 00:08:22 - Une histoire et... Oli - Une histoire d'antan au fin fond des contrées montagneuses de l'Italie. Une histoire qui chante l'accent du nord des Italiens. Une histoire de villages voisins sur deux versants. Une histoire un peu étonnante tout de même...</itunes:summary>
      <itunes:duration>00:08:22</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le lion qui se lamentait"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-lion-qui-se-lamentait-2632140</link>
      <description>durée : 00:10:15 - Une histoire et... Oli - Pour la série de podcast Oli, la romancière a imaginé Le lion qui se lamentait : comment le lion devint le roi des animaux grâce à un cache-nez…</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/36611dbd-bbc6-4b69-a2f9-a7545775d938/19721-15.10.2018-ITEMA_21853234-2018F33264S1282-21.mp3" length="9877597" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2018-ITEMA_21853234-2018F33264S1282-21.mp3</guid>
      <pubDate>Mon, 15 Oct 2018 05:02:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S1282</podcastRF:magnetothequeID>
      <itunes:title>"Le lion qui se lamentait"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,lion,qui,se,lamentait"</itunes:keywords>
      <itunes:subtitle>"Le lion qui se lamentait"</itunes:subtitle>
      <itunes:summary>durée : 00:10:15 - Une histoire et... Oli - Pour la série de podcast Oli, la romancière a imaginé Le lion qui se lamentait : comment le lion devint le roi des animaux grâce à un cache-nez…</itunes:summary>
      <itunes:duration>00:10:15</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Héloïse, Artémis et le sort Premium"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/heloise-artemis-et-le-sort-premium-6294436</link>
      <description>durée : 00:11:38 - Une histoire et... Oli - Chloé Delaume a créé l'histoire d'Héloïse, une petite fille qui grâce à un sort jeté par une Déesse qui "n’aime pas tellement que l’on maltraite un arbre", obtient tout ce qu'elle veut, comme par exemple devenir la première en tout - sauf que ce n'est pas très drôle quand ce n'est pas mérité.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/62ebc944-8a5e-42d9-ace9-6a712d8e80d4/19721-15.10.2018-ITEMA_21853234-2018F33264S0282-21.mp3" length="11203713" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-15.10.2018-ITEMA_21853234-2018F33264S0282-21.mp3</guid>
      <pubDate>Mon, 15 Oct 2018 05:00:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S0282</podcastRF:magnetothequeID>
      <itunes:title>"Héloïse, Artémis et le sort Premium"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Héloïse,,Artémis,et,le,sort,Premium"</itunes:keywords>
      <itunes:subtitle>"Héloïse, Artémis et le sort Premium"</itunes:subtitle>
      <itunes:summary>durée : 00:11:38 - Une histoire et... Oli - Chloé Delaume a créé l'histoire d'Héloïse, une petite fille qui grâce à un sort jeté par une Déesse qui "n’aime pas tellement que l’on maltraite un arbre", obtient tout ce qu'elle veut, comme par exemple devenir la première en tout - sauf que ce n'est pas très drôle quand ce n'est pas mérité.</itunes:summary>
      <itunes:duration>00:11:38</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le renard et le poulailler"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-renard-et-le-poulailler-1674829</link>
      <description>durée : 00:10:06 - Une histoire et... Oli - Alors que Bernadette, Josette et Colette, trois poules discutent tranquillement de philo et de liberté dans leur poulailler, un renard vient toquer à la porte. Si la liberté existe, dit le renard, il faut me laisser entrer chez vous.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/15a1be20-e3dc-4e49-84e8-48fbe6df576a/19721-04.09.2018-ITEMA_21796903-2018F33264S4248-21.mp3" length="9724386" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S4248-21.mp3</guid>
      <pubDate>Tue, 04 Sep 2018 16:38:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S4248</podcastRF:magnetothequeID>
      <itunes:title>"Le renard et le poulailler"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,renard,et,le,poulailler"</itunes:keywords>
      <itunes:subtitle>"Le renard et le poulailler"</itunes:subtitle>
      <itunes:summary>durée : 00:10:06 - Une histoire et... Oli - Alors que Bernadette, Josette et Colette, trois poules discutent tranquillement de philo et de liberté dans leur poulailler, un renard vient toquer à la porte. Si la liberté existe, dit le renard, il faut me laisser entrer chez vous.</itunes:summary>
      <itunes:duration>00:10:06</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Olga, le canard, et le petit garçon battu"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/olga-le-canard-et-le-petit-garcon-battu-6878640</link>
      <description>durée : 00:12:37 - Une histoire et... Oli - Vous êtes fatigués de lire à vos enfants la même histoire tous les soirs ? Voici une solution. Elle s'appelle Oli. C'est une une série d'histoires audio proposée par France Inter. À écouter partout et tout le temps comme "Olga, le canard, et le petit garçon battu" racontée par Geneviève Brisac.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/7cb03e0d-42dd-4841-93d9-584e7adfd5cb/19721-04.09.2018-ITEMA_21796903-2018F33264S3248-21.mp3" length="12137452" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S3248-21.mp3</guid>
      <pubDate>Tue, 04 Sep 2018 16:36:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S3248</podcastRF:magnetothequeID>
      <itunes:title>"Olga, le canard, et le petit garçon battu"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Olga,,le,canard,,et,le,petit,garçon,battu"</itunes:keywords>
      <itunes:subtitle>"Olga, le canard, et le petit garçon battu"</itunes:subtitle>
      <itunes:summary>durée : 00:12:37 - Une histoire et... Oli - Vous êtes fatigués de lire à vos enfants la même histoire tous les soirs ? Voici une solution. Elle s'appelle Oli. C'est une une série d'histoires audio proposée par France Inter. À écouter partout et tout le temps comme "Olga, le canard, et le petit garçon battu" racontée par Geneviève Brisac.</itunes:summary>
      <itunes:duration>00:12:37</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Lucia Petite Poète"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/lucia-petite-poete-5974965</link>
      <description>durée : 00:12:36 - Une histoire et... Oli - Une petite fille qui veut impressionner sa meilleure amie décide de lui expliquer comment les étoiles tiennent dans le ciel. Pour préparer sa mission, elle lit des livres et découvre les pouvoirs mystérieux et enchanteurs de la lecture.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/c6a29018-633e-40ea-b7ee-ee226c983291/19721-04.09.2018-ITEMA_21796903-2018F33264S2248-21.mp3" length="12126421" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S2248-21.mp3</guid>
      <pubDate>Tue, 04 Sep 2018 16:34:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S2248</podcastRF:magnetothequeID>
      <itunes:title>"Lucia Petite Poète"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Lucia,Petite,Poète"</itunes:keywords>
      <itunes:subtitle>"Lucia Petite Poète"</itunes:subtitle>
      <itunes:summary>durée : 00:12:36 - Une histoire et... Oli - Une petite fille qui veut impressionner sa meilleure amie décide de lui expliquer comment les étoiles tiennent dans le ciel. Pour préparer sa mission, elle lit des livres et découvre les pouvoirs mystérieux et enchanteurs de la lecture.</itunes:summary>
      <itunes:duration>00:12:36</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Nadine et Robert les poissons rouges"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/nadine-et-robert-les-poissons-rouges-4757039</link>
      <description>durée : 00:08:53 - Une histoire et... Oli - Ne cherchez plus d'histoires du soir pour vos enfants car voici la solution, et elle s'appelle Oli. Mais qu'est-ce que c'est ? Une série d'histoires à raconter à vos chères têtes blondes imaginées et racontées par de nombreux auteurs comme Delphine de Vigan.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/89e5d9ff-a078-4079-a3da-c91656f96356/19721-04.09.2018-ITEMA_21796903-2018F33264S1248-21.mp3" length="8565446" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S1248-21.mp3</guid>
      <pubDate>Tue, 04 Sep 2018 16:32:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S1248</podcastRF:magnetothequeID>
      <itunes:title>"Nadine et Robert les poissons rouges"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Nadine,et,Robert,les,poissons,rouges"</itunes:keywords>
      <itunes:subtitle>"Nadine et Robert les poissons rouges"</itunes:subtitle>
      <itunes:summary>durée : 00:08:53 - Une histoire et... Oli - Ne cherchez plus d'histoires du soir pour vos enfants car voici la solution, et elle s'appelle Oli. Mais qu'est-ce que c'est ? Une série d'histoires à raconter à vos chères têtes blondes imaginées et racontées par de nombreux auteurs comme Delphine de Vigan.</itunes:summary>
      <itunes:duration>00:08:53</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>"Le coq solitaire"</title>
      <link>https://www.radiofrance.fr/franceinter/podcasts/une-histoire-et-oli/le-coq-solitaire-8013058</link>
      <description>durée : 00:10:56 - Une histoire et... Oli - Alain Mabanckou nous raconte l'histoire du Grand-Père Moukila et de son double animal "le coq solitaire", dans un village africain. La légende veut qui si l'un meurt, l'autre part avec lui.</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <category>Kids &amp; Family</category>
      <enclosure url="https://rf.proxycast.org/76111624-03e4-4808-bc07-4124f2379b68/19721-04.09.2018-ITEMA_21796903-2018F33264S0248-21.mp3" length="10534293" type="audio/mpeg"/>
      <guid isPermaLink="true">http://media.radiofrance-podcast.net/podcast09/19721-04.09.2018-ITEMA_21796903-2018F33264S0248-21.mp3</guid>
      <pubDate>Tue, 04 Sep 2018 16:30:00 +0200</pubDate>
      <podcastRF:businessReference>33264</podcastRF:businessReference>
      <podcastRF:magnetothequeID>2018F33264S0248</podcastRF:magnetothequeID>
      <itunes:title>"Le coq solitaire"</itunes:title>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2019/03/b4316f3b-fa00-4097-b94f-38db3657136d/1400x1400_oli-1400x1400-livre.jpg"/>
      <itunes:author>France Inter</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:keywords>"Le,coq,solitaire"</itunes:keywords>
      <itunes:subtitle>"Le coq solitaire"</itunes:subtitle>
      <itunes:summary>durée : 00:10:56 - Une histoire et... Oli - Alain Mabanckou nous raconte l'histoire du Grand-Père Moukila et de son double animal "le coq solitaire", dans un village africain. La légende veut qui si l'un meurt, l'autre part avec lui.</itunes:summary>
      <itunes:duration>00:10:56</itunes:duration>
      <googleplay:block>yes</googleplay:block>
    </item>
    <item>
      <title>Retrouvez tous les épisodes sur l’appli Radio France</title>
      <link>https://www.radiofrance.fr/application-mobile-radio-france</link>
      <description>Retrouvez tous les épisodes sur l’appli Radio France</description>
      <author>podcast@radiofrance.com (Radio France)</author>
      <enclosure url="https://media.radiofrance-podcast.net/podcast09/22452-07.07.2021-ITEMA_22721876-2021X45038E0002.mp3" length="0" type="audio/mpeg"/>
      <guid isPermaLink="true">https://media.radiofrance-podcast.net/podcast09/22452-07.07.2021-ITEMA_22721876-2021X45038E0002.mp3</guid>
      <pubDate>Tue, 28 Aug 2018 23:59:59 +0200</pubDate>
      <itunes:title>Retrouvez tous les épisodes sur l’appli Radio France</itunes:title>
      <itunes:author>Radio France</itunes:author>
      <itunes:explicit>no</itunes:explicit>
      <itunes:subtitle>Retrouvez tous les épisodes sur l’appli Radio France</itunes:subtitle>
      <itunes:summary>Retrouvez tous les épisodes sur l’appli Radio France</itunes:summary>
      <itunes:duration>00:00:12</itunes:duration>
      <itunes:image href="https://www.radiofrance.fr/s3/cruiser-production/2022/01/04f722eb-ed54-439f-9be6-532ecad002c9/1400x1400_radio-france-avatar.jpg"/>
    </item>
  </channel>
</rss>
`
const parser = new XMLParser();
let data = parser.parse(rawXml);

const meta = data.rss.channel.item.map(obj => {
    return {
        title: obj.title,
        filename: camelCase(deburr(obj.title)),
        url: obj.guid.startsWith("http") ? obj.guid : `http://media.radiofrance-podcast.net/podcast09/${obj.guid}.mp3`,
        customUrl: !obj.guid.startsWith("http"),
    }
});

console.log(meta)



