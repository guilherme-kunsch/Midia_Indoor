import { useEffect, useState } from "react";
import { FaTemperatureHigh } from "react-icons/fa6";
import { FaStopwatch } from "react-icons/fa6";

const Marquee = () => {
    const [time, setTime] = useState(new Date());
    const [temperature, setTemperature] = useState("");
    const [dollarRate, setDollarRate] = useState("5.00");
    const [ varBidDollar, setVarBidDollar ] = useState(true)
    const [euroRate, setEuroRate] = useState("6.00");
    const [ varBidEuro, setVarBidEuro ] = useState(true)
    const [noticias, setNoticias] = useState<string[]>([]);



    useEffect(() => {
        const fetchDollar = async () => {
            try {
                const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
                const data = await response.json();
                setDollarRate(data.USDBRL.bid);
                if(data.USDBRL.varBid <= 0){
                    setVarBidDollar(false)
                }

                const responseEuro = await fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL");
                const dataEuro = await responseEuro.json();
                setEuroRate(dataEuro.EURBRL.bid);

                if(dataEuro.EURBRL.varBid <= 0){
                    setVarBidEuro(false)
                }

                try {
                    const g1RSSUrl = 'https://api.allorigins.win/get?url=https://g1.globo.com/rss/g1/';
                    const response = await fetch(g1RSSUrl);
                    const data = await response.json();

                    if (data && data.contents) {

                        const parser = new DOMParser();
                        const xml = parser.parseFromString(data.contents, "text/xml");
                        const items = xml.getElementsByTagName("item");

                        const top5News = [];
                        for (let i = 0; i < 5 && i < items.length; i++) {
                            const title = items[i].getElementsByTagName("title")[0]?.textContent;
                            if (title) {
                                top5News.push(title);
                            }
                        }
                        console.log(top5News)
                        setNoticias(top5News);
                    } else {
                        console.error('Conteúdo do RSS não encontrado.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar notícias do G1:', error);
                }

                try {
                    const url = "https://api.open-meteo.com/v1/forecast?latitude=-20.121&longitude=-40.307&current_weather=true";
                    const response = await fetch(url);
                    const data = await response.json();

                    console.log(data.current_weather.temperature)

                    // Verifica se os dados foram recebidos corretamente
                    if (data && data.current_weather && data.current_weather.temperature) {
                        setTemperature(data.current_weather.temperature);
                    } else {
                        console.error("Dados de temperatura não disponíveis");
                    }
                } catch (error) {
                    console.error("Erro ao buscar a temperatura:", error);
                }
            } catch (error) {
                console.error("Erro ao buscar a cotação do dólar:", error);
            }
        };

        // Atualiza a hora a cada segundo
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Chama a função de busca
        fetchDollar();

        return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
    }, []);
    useEffect(() => {
        setDollarRate("R$ 5.10");
        setEuroRate("R$ 6.20");
        setTemperature("27°C");
    }, []);

    return (
        <div className="bg-dark-purple h-[10%] w-full flex items-center text-white">
            <div className="w-[85%] border-r-4 flex">
                <span className="mx-8 flex"><FaStopwatch className="flex mt-1 mr-2"/> {time.toLocaleTimeString()}</span>
                <span className="mx-8 flex "><FaTemperatureHigh className="flex mt-1 mr-2"/> {temperature} °C</span>
                <span className="ml-8 mr-2">USD/BRL: </span>
                <span className={`mr-8 ${varBidDollar ? "text-green-600" : "text-red-600"}`}>
                    R$ {dollarRate}
                </span>
                <span className="ml-8 mr-2">EUR/BRL: </span>
                <span className={`mr-8 ${varBidEuro ? "text-green-600" : "text-red-600"}`}>
                    R$ {euroRate}
                </span>
            </div>
            <div className="marquee w-full bg-dark-purple z-10">
                <div className="marquee-content text-lg inline-block animate-scrollText">
                    {noticias.map((noticia, index) => (
                        <span key={index} className="mx-28">
                            {noticia}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
