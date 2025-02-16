import { BiCategory } from 'react-icons/bi';
import { TSidebarItem } from './generateSidebarItems';

import { AiOutlineFileText, AiOutlineQuestionCircle, AiOutlineStar } from 'react-icons/ai';
import { CiMedal } from 'react-icons/ci';
import { IoBarChartOutline } from 'react-icons/io5';
import { RiUserStarLine } from 'react-icons/ri';
import { BsMegaphone, BsPersonGear } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
const sidebarItems: TSidebarItem[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '',
        icon: <IoBarChartOutline size={24} />,
    },
    {
        key: 'brands',
        label: 'Brands',
        path: 'brands',
        icon: <CiMedal size={24} />,
    },
    {
        key: 'influencer',
        label: 'Influencer',
        path: 'influencer',
        icon: <RiUserStarLine size={24} />,
    },
    {
        key: 'categories',
        label: 'Categories',
        path: 'categories',
        icon: <BiCategory size={24} />,
    },
    {
        key: 'reviews',
        label: 'Reviews',
        path: 'reviews',
        icon: <AiOutlineStar size={24} />,
    },
    {
        key: 'campaign',
        label: 'Campaign',
        path: 'campaign',
        icon: <BsMegaphone size={24} />,
    },
    {
        key: 'add-admin',
        label: 'Add Admin',
        path: 'make-admin',
        icon: <BsPersonGear size={24} />,
    },
    {
        key: 'terms',
        label: 'Terms & Conditions',
        path: 'terms',
        icon: <AiOutlineFileText size={24} />,
    },
    {
        key: 'faqs',
        label: 'FAQs',
        path: 'faqs',
        icon: <AiOutlineQuestionCircle size={24} />,
    },
    {
        key: 'logout',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
