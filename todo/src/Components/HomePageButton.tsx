import {useNavigate} from "react-router-dom"
import {route_getAllTodo} from "../Utilities/Routes"

const HomePageButton: React.FC = () => {

    const navigate = useNavigate();

    return (
        
        <div className="container">
            <div className="row text-center">
                <div className="col">
                    <button onClick={() => navigate(route_getAllTodo)} className="btn btn-secondary btn-lg">Tilbake til hovedsiden</button>
                </div>
            </div>
        </div>

    );
  
  }

  export default HomePageButton;