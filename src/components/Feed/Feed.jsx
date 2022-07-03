import {useMoralisDapp} from "providers/MoralisDappProvider/MoralisDappProvider"
import {useState} from "react"
import Posts from "./components/Posts"
import Reputation from "components/Reputation"

import {Avatar, Button }from "antd" 
import glStyles from "components/gstyles"
import Blockie from "components/Blockie"
import AddPost from "./components/AddPost"

const Feed = () => {
    const {selectedCategory} = useMoralisDapp();
    const [showAddPost, setShowAddPost] = useState(false)

    let result = null;
    
    function toogleShowAddPost(){
        setShowAddPost(!showAddPost);
    }

    if (selectedCategory["category"] === "default") {
        result = (
          <div className="col-lg-9">
            <h3>Choose an OKR from the menu</h3>
          </div>
        );
      }
    else {
        result = (
        <div className="col-lg-9">
            <div
                style={{
                    ...glStyles.card,
                    padding: "10px 13px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Avatar src={<Blockie currentWallet />} />
                <h4> You have completed <Reputation/> key results in {selectedCategory["category"]}</h4>
                <Button shape="round" onClick={toogleShowAddPost}>
                    Post
                </Button>
            </div>
            {showAddPost ? <AddPost/>:""}
            <Posts/>
        </div>    
        )
    }
    
    return result;
}

export default Feed
