
const tips = [
    {
        title: "Maak een planning:",
        text: "Verdeel je leerstof over meerdere dagen en plan voldoende pauzes in om alles rustig te verwerken."
    },
    {
        title: "Leg de leerstof uit:",
        text: "Probeer de leerstof in je eigen woorden uit te leggen alsof je lesgeeft aan iemand anders."
    },
    {
        title: "Vermijd afleiding:",
        text: "Leg je gsm weg en zoek een rustige plek waar je je volledig op het studeren kunt concentreren."
    },
    {
        title: "Neem regelmatig pauzes:",
        text: "Studeren gaat vaak beter als je regelmatig even ontspant en je hersenen wat rust geeft."
    },
    {
        title: "Test jezelf:",
        text: "Maak oefenvragen of gebruik flashcards om te controleren hoeveel je al onthouden hebt."
    },
    {
        title: "Begin op tijd:",
        text: "Wacht niet tot de dag voor je toets, maar leer elke dag een klein stukje om stress te verminderen."
    },
    {
        title: "Zorg voor voldoende slaap:",
        text: "Een goede nachtrust helpt je hersenen om informatie beter te onthouden en te verwerken."
    },
    {
        title: "Gebruik kleurcodes:",
        text: "Markeer belangrijke begrippen en gebruik verschillende kleuren om de leerstof overzichtelijker te maken."
    },
    {
        title: "Wissel vakken af:",
        text: "Door verschillende vakken af te wisselen, blijf je langer geconcentreerd en voorkom je verveling."
    },
    {
        title: "Studeer actief:",
        text: "Maak samenvattingen in je eigen woorden en schrijf belangrijke informatie op zonder naar je cursus te kijken."
    },
    {
        title: "Stel haalbare doelen:",
        text: "Verdeel grote hoeveelheden leerstof in kleine taken, zodat je gemotiveerd blijft en vooruitgang ziet."
    },
    {
        title: "Drink voldoende water:",
        text: "Zorg ervoor dat je tijdens het studeren genoeg water drinkt om je goed te blijven voelen en concentreren."
    },
    {
        title: "Gebruik de Pomodoro-techniek:",
        text: "Studeer 25 minuten geconcentreerd en neem daarna 5 minuten pauze om je focus te behouden."
    },
    {
        title: "Begin met het moeilijkste:",
        text: "Pak moeilijke onderwerpen aan wanneer je nog fris bent, zodat je er voldoende aandacht aan kunt besteden."
    },
    {
        title: "Herhaal regelmatig:",
        text: "Herhaal eerder geleerde informatie op verschillende momenten om die beter in je langetermijngeheugen op te slaan."
    },
    {
        title: "Gebruik ezelsbruggetjes:",
        text: "Verzin korte zinnen, woorden of afkortingen om moeilijke informatie gemakkelijker te onthouden."
    },
    {
        title: "Werk met schema's:",
        text: "Zet belangrijke informatie in schema's, mindmaps of tabellen zodat je beter het overzicht bewaart."
    },
    {
        title: "Oefen zonder je notities:",
        text: "Probeer informatie uit je hoofd op te schrijven of op te zeggen voordat je je notities opnieuw bekijkt."
    },
    {
        title: "Studeer op een vaste plek:",
        text: "Kies een rustige werkplek waar je je goed kunt concentreren en zo weinig mogelijk wordt afgeleid."
    },
    {
        title: "Beloon jezelf:",
        text: "Geef jezelf na het behalen van een studiedoel een kleine beloning om gemotiveerd te blijven."
    },
    {
        title: "Focus op moeilijke leerstof:",
        text: "Besteed extra tijd aan onderwerpen die je lastig vindt en oefen ze totdat je ze goed begrijpt."
    },
    {
        title: "Gebruik voorbeelden:",
        text: "Koppel moeilijke theorie aan concrete voorbeelden uit het dagelijks leven om de leerstof beter te begrijpen."
    },
    {
        title: "Controleer je vooruitgang:",
        text: "Test regelmatig jezelf om te ontdekken welke onderwerpen je al beheerst en welke je nog moet herhalen."
    }
];


const randomTip = Math.floor(Math.random() * tips.length);

document.getElementById("tipTitle").textContent = tips[randomTip].title;
document.getElementById("tipText").textContent = tips[randomTip].text;