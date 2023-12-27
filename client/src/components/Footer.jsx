import { Image } from '@nextui-org/react'
import pic from '../assets/asif2.jpg'
const Footer = () => {
    return (
        <div className="h-[30vh] bg-primary py-2 flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
                <Image src={pic} className='object-cover h-24 w-24 rounded-full' />
                <div className='hidden md:flex flex-row gap-2 items-center '>
                    <p className="text-white">Aasif Ali</p>
                    <p className="text-white">|</p>
                    <p className="text-white">Frontend Developer</p>
                    <p className="text-white">|</p>
                    <p className="text-white">Full-Stack Developer</p>
                </div>
            </div>
            <p className="text-white text-center py-4">&copy; All rights Reserved </p>
        </div>
    )
}
export default Footer