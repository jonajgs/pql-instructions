import axios from "axios";
import FormTeam from './../../components/FormTeam.tsx';
import TeamGrid from "../../components/TeamGrid.tsx";
import Header from "../../components/Header.tsx";

const HomeContainer = () => {
    axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3001/api/';

    return (
        <main className="container">
            <Header />
            <div className="grid grid-cols-2 gap-4 p-10">
                <TeamGrid />
                <FormTeam />
            </div>
        </main>
    )
}

export default HomeContainer;
