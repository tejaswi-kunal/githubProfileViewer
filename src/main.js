import React,{useState,useEffect} from "react";
import ReactDom from "react-dom/client";

function App()
{
    // we have to return a github profile viewer
    const [profile,setProfile]=useState([]);
    const [total,setTotal]=useState("");

    // now we have to fetch the users profiles
    async function ProfileFetcher(total) 
    {
        // lets also decide the index
        try{
        const era=Math.floor(Math.random()*10000+1);
        const respose=await fetch(`https://api.github.com/users?since=${era}&per_page=${total}`)
        const data=await respose.json();

        if (Array.isArray(data)) 
        {
            setProfile(data);
        }

        else 
        {
            setProfile([]);         
            alert("GitHub rate limit exceeded. Try again in 1 minute.");
        }
        }
        catch (err) {
        console.error("Error occurred:", err);
  }
    }

    useEffect(()=>{
        ProfileFetcher(10);
    },[]);
    

    return(
        <>
            <h1 className="heading">Github Profile Viewer</h1>

            <div className="search">
                <input type="text" placeholder="Enter Number Profiles" value={total} onChange={(e)=>setTotal(e.target.value)}></input>
                <button onClick={()=>ProfileFetcher(Number(total))}>Search</button>
            </div>

            <div className="card-box">
            {
                profile.map((value,index)=>{
                    return(
                        <div key={index} className="card">
                            <img className="image" src={value.avatar_url}></img>
                            <h2 className="namings">{value.login}</h2>
                            <a href={value.html_url} target="_blank">Profile</a>
                        </div>
                    )
                })
            }
            </div>

        </>
    )
}



const root=ReactDom.createRoot(document.getElementById('root'));
root.render(<App/>);