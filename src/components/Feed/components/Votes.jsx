import { useState, useEffect } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis, useMoralisQuery } from "react-moralis";


const Votes = ({postId}) => {
    const {Moralis} = useMoralis();
    const [postVotes, setPostVotes] = useState("0");
    const { contractABI, contractAddress} = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI)
    
    const { data } = useMoralisQuery("Votes", (query) => query.equalTo("postId", postId), [], { live: true });
    const options = {
        contractAddress: "0x3d115aF63DE1ECBc8521e25d8CbD3da500dB96c0",
        functionName: "getPost",
        abi: contractABIJson,
        params: {
          _postId: postId
        }
      };
    
    useEffect(() => {
        async function getPostVotes() {
            await Moralis.enableWeb3;
            const result = await Moralis.executeFunction(options);
            setPostVotes(result[3]);
        }
        getPostVotes();
    }, [data]);
    
    return (
        <>
          {postVotes}  
        </>
    )
}

export default Votes
