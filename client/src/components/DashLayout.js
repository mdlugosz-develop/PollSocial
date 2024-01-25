import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

const DashLayout = () => {
    return (
        <div className="scroll-smooth h-screen ">
            <div className="md:mx-auto md:grid md:w-11/12 md:grid-cols-4 md:gap-6 h-full">

                <Leftbar />

                <Outlet />

                <Rightbar />
            </div>
        </div >

    )
}

export default DashLayout