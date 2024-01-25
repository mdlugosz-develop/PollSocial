import { Link } from "react-router-dom"
import { GoHomeFill } from "react-icons/go";
import { RiCommunityFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { BsFillPlusSquareFill } from "react-icons/bs";



const Leftbar = () => {

    return (
        <div className="bg-gray-300 rounded-lg p-4 ">
            <div className="flex flex-col justify-start items-center">
                <div className="flex flex-col items-start gap-4 w-full p-5">
                    <Link
                        className="flex items-center gap-2 text-lg font-medium hover:text-primary"
                        to="/home"
                    >
                        <GoHomeFill />
                        <p>Home</p>
                    </Link>
                    <Link
                        className="flex items-center gap-2 text-lg font-medium hover:text-primary"
                        to="/home"
                    >
                        <RiCommunityFill />
                        <p>Communities</p>
                    </Link>
                    <Link
                        className="flex items-center gap-2 text-lg font-medium hover:text-primary"
                        to="/home"
                    >
                        <CgProfile />
                        <p>Profile</p>
                    </Link>
                    <Link
                        className="flex items-center gap-2 text-lg font-medium hover:text-primary"
                        to="/home"
                    >
                        <IoIosSettings />
                        <p>Settings</p>
                    </Link>
                    <Link
                        className="flex items-center gap-2 text-lg font-medium hover:text-primary"
                        to="/home"
                    >
                        <BsFillPlusSquareFill />
                        <p>Post</p>
                    </Link>

                </div>
            </div>
        </div>


    )

}

export default Leftbar