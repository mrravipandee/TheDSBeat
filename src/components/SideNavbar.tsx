// components/SideNavbar.tsx
"use client"

import Image from "next/image";
import { FaHome, FaChartLine, FaQuestionCircle, FaClipboardList, FaSignOutAlt, FaUser, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState("Home");
    const [userName, setUserName] = useState("Guest");
    const [userGender, setUserGender] = useState<"male" | "female" | "other" | null>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Load user data from local storage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('userName') || "Guest";
            const savedGender = localStorage.getItem('userGender') as "male" | "female" | "other" | null;
            
            setUserName(savedName);
            setUserGender(savedGender);
            
            // Show modal if no name is set
            if (!localStorage.getItem('userName')) {
                setShowProfileModal(true);
            }
        }
    }, []);

    const handleSaveProfile = (name: string, gender: "male" | "female" | "other") => {
        localStorage.setItem('userName', name);
        localStorage.setItem('userGender', gender);
        setUserName(name);
        setUserGender(gender);
        setShowProfileModal(false);
    };

    // Function to handle menu item clicks
    const handleItemClick = (label: string) => {
        setActiveItem(label);
        // You can add navigation logic here if using Next.js router
    };

    // Function to handle logout
    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('userName');
        localStorage.removeItem('userGender');
        // Redirect to login or perform other logout actions
    };

    // Get appropriate avatar based on gender
    const getAvatar = () => {
        switch(userGender) {
            case "male":
                return "https://static.vecteezy.com/system/resources/previews/004/607/791/non_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg";
            case "female":
                return "https://static.vecteezy.com/system/resources/previews/006/940/053/non_2x/beautiful-young-female-character-wearing-casual-clothes-flat-cartoon-illustration-free-vector.jpg";
            case "other":
                return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
            default:
                return <FaUser className="w-15 h-15 text-purple-500" />;
        }
    };

    return (
        <>
            <div className="h-screen w-64 bg-purple-100 flex flex-col justify-between shadow-lg sticky top-0">
                {/* Top Section */}
                <div>
                    <div className="p-6 text-2xl font-bold text-purple-800 flex items-center justify-center">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">DS</span>
                        <span className="ml-2">Beat</span>
                    </div>

                    {/* Profile */}
                    <div className="flex flex-col items-center p-4">
                        <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-purple-300 shadow-md bg-white">
                            {typeof getAvatar() === 'string' ? (
                                <Image
                                    src={getAvatar() as string}
                                    alt="User"
                                    width={80}
                                    height={80}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                getAvatar()
                            )}
                            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">Welcome back,</p>
                        <p className="text-lg font-semibold text-purple-700 truncate max-w-full px-2">{userName}</p>
                        <button 
                            onClick={() => setShowProfileModal(true)}
                            className="mt-2 text-sm text-purple-600 hover:text-purple-800 underline"
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Menu */}
                    <nav className="mt-6 space-y-1 px-4">
                        <SidebarItem 
                            icon={<FaHome />} 
                            label="Home" 
                            active={activeItem === "Home"} 
                            onClick={() => handleItemClick("Home")}
                        />
                        <SidebarItem 
                            icon={<FaChartLine />} 
                            label="Progress" 
                            active={activeItem === "Progress"} 
                            onClick={() => handleItemClick("Progress")}
                        />
                        <SidebarItem 
                            icon={<FaQuestionCircle />} 
                            label="Question" 
                            active={activeItem === "Question"} 
                            onClick={() => handleItemClick("Question")}
                        />
                        <SidebarItem 
                            icon={<FaClipboardList />} 
                            label="Test" 
                            active={activeItem === "Test"} 
                            onClick={() => handleItemClick("Test")}
                        />
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="p-4">
                    <div className="text-sm italic text-center text-purple-600 mb-4 px-2">
                        "Success is the sum of small efforts, repeated day in and day out."
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full p-2 rounded-lg text-gray-700 hover:bg-purple-200 transition-colors"
                    >
                        <FaSignOutAlt className="text-purple-700" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Profile Setup Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-purple-800">
                                {userName === "Guest" ? "Complete Your Profile" : "Edit Profile"}
                            </h2>
                            <button 
                                onClick={() => setShowProfileModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        
                        <ProfileForm 
                            initialName={userName}
                            initialGender={userGender}
                            onSave={handleSaveProfile}
                            onCancel={() => setShowProfileModal(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

type SidebarItemProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
    return (
        <div 
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                ${active ? 'bg-purple-600 text-white' : 'text-gray-700 hover:bg-purple-200'}`}
            onClick={onClick}
        >
            <span className={`text-xl ${active ? 'text-white' : 'text-purple-700'}`}>{icon}</span>
            <span className="text-md font-medium">{label}</span>
            {active && (
                <div className="ml-auto w-1 h-6 bg-white rounded-full"></div>
            )}
        </div>
    );
}

type ProfileFormProps = {
    initialName: string;
    initialGender: "male" | "female" | "other" | null;
    onSave: (name: string, gender: "male" | "female" | "other") => void;
    onCancel: () => void;
};

function ProfileForm({ initialName, initialGender, onSave, onCancel }: ProfileFormProps) {
    const [name, setName] = useState(initialName);
    const [gender, setGender] = useState<"male" | "female" | "other" | null>(initialGender);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && gender) {
            onSave(name, gender);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                    Your Name
                </label>
                <input
                    id="name"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                    Gender
                </label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className={`flex-1 py-2 px-4 rounded border ${
                            gender === "male" 
                                ? 'bg-purple-100 border-purple-500 text-purple-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setGender("male")}
                    >
                        Male
                    </button>
                    <button
                        type="button"
                        className={`flex-1 py-2 px-4 rounded border ${
                            gender === "female" 
                                ? 'bg-purple-100 border-purple-500 text-purple-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setGender("female")}
                    >
                        Female
                    </button>
                    <button
                        type="button"
                        className={`flex-1 py-2 px-4 rounded border ${
                            gender === "other" 
                                ? 'bg-purple-100 border-purple-500 text-purple-700' 
                                : 'border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setGender("other")}
                    >
                        Other
                    </button>
                </div>
            </div>
            
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
                    disabled={!name || !gender}
                >
                    Save
                </button>
            </div>
        </form>
    );
}