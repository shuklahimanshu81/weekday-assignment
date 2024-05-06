const CardData = async (limit,index,setData)=> {
     const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            "limit":limit,
            "offset": index
           });
           
           const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
           };
           
           const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
           response.json().then((res) => {
                setData((prevItems) => [...prevItems, ...res.jdList]);
              }).catch((err) => console.log(err));
}

export default CardData