import { useCallback, useEffect, useState } from "react";
import CardData from "./CardData";

const Card = () => {
    // const [limit,setLimit] = useState(10)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(1)
    const [limit, setLimit] = useState(10)

    const fetchData = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        CardData(limit, index, setData);
        setIndex((prevIndex) => prevIndex + 1);
        setLimit((prevLimit) => prevLimit + 10)
        setIsLoading(false);

    }, [index, isLoading]);



    useEffect(() => {
        const getData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const body = JSON.stringify({
                    "limit": limit,
                    "offset": index
                });
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body
                };
                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
                const result = await response.json()
                setData(result?.jdList)
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                fetchData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchData]);

    return <div>{data?.map((item,index) => {
        if(index === 1 )console.log(item)
        return <div key={item?.jdUid}>
            <div> <p>⏳ Posted 10 days ago </p></div>
            <div>
                <img src={item?.logoUrl} />
                <div>
                    <p> {item?.companyName} </p>
                    <p>{item?.jobRole} </p>
                    <p>{item?.location}</p>
                </div>
            </div>
            <div>
                <p> Estimated Salary : $ {item?.minJdSalary}k - $ {item?.maxJdSalary}k  </p>
            </div>
            <div>
                <h3> About Company </h3>
                <h4> About Us </h4>
                <p>{item?.jobDetailsFromCompany}</p>
                <button> View job </button>
            </div>
            <div>
                <p> Minimum experience </p>
                <p> {item?.minExp} years </p>
            </div>
            <div>
                <button> Easy apply</button>
                <button> Unlock referral asks</button>
            </div>
        </div>
    })
    }</div>
}
export default Card
