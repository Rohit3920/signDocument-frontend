
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md z-50">
            <h2 className='text-2xl font-bold text-blue-400 hidden md:block'>Document Signature </h2>

            <ul className='flex'>
                <li className='px-2 mr-2'>login</li>
                <li className='px-2 mr-2'>signup</li>
            </ul>
        </div>
    )
}
export default Navbar;