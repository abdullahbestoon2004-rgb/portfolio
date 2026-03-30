import { useState, useEffect } from 'react';
import axios from '../../utils/apiClient';
import { Save, User, Mail, Globe, Hash, Camera } from 'lucide-react';
import Notification from '../../components/admin/shared/Notification';

const compressImage = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
        const img = new Image();

        img.onerror = () => reject(new Error('Failed to process image'));
        img.onload = () => {
            const maxSize = 900;
            const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
            const canvas = document.createElement('canvas');

            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);

            const context = canvas.getContext('2d');
            if (!context) {
                reject(new Error('Canvas is not supported in this browser'));
                return;
            }

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.82));
        };

        img.src = reader.result;
    };

    reader.readAsDataURL(file);
});

const ManageProfile = () => {
    const [profile, setProfile] = useState({
        name: '', subtitle: '', aboutTitle: '', aboutDescription: '', profileImage: '',
        yearsOfExperience: 0, projectsCompleted: 0, happyClients: '', email: '',
        githubLink: '', linkedinLink: '', instagramLink: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: 'success' });

    useEffect(() => {
        axios.get('/api/profile').then(res => {
            if (res.data) setProfile(res.data);
        });
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const compressedImage = await compressImage(file);
                setProfile((currentProfile) => ({ ...currentProfile, profileImage: compressedImage }));
                setNotification({ message: 'Profile image updated. Save changes to keep it.', type: 'success' });
            } catch (error) {
                setNotification({ message: 'Failed to process the selected image.', type: 'error' });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put('/api/profile', profile);
            setNotification({ message: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Failed to update profile. Try a smaller image.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-2">Global Profile</h1>
                <p className="text-white/40 font-light text-lg">Manage your identity, social presence, and core portfolio metrics</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Hero & Identity */}
                <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                            <User size={20} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Identity & Hero</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold flex items-center gap-2">
                                <Hash size={14} className="text-[var(--color-accent)]" />
                                Display Name
                            </label>
                            <input
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all placeholder:text-white/10"
                                required
                                value={profile.name}
                                onChange={e => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold flex items-center gap-2">
                                <Globe size={14} className="text-[var(--color-accent)]" />
                                Hero Subtitle
                            </label>
                            <input
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all placeholder:text-white/10"
                                required
                                value={profile.subtitle}
                                onChange={e => setProfile({ ...profile, subtitle: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-4">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold flex items-center gap-2">
                                <Camera size={14} className="text-[var(--color-accent)]" />
                                Profile Image
                            </label>
                            <div className="flex flex-col md:flex-row items-center gap-8 bg-black/30 p-8 rounded-3xl border border-white/5">
                                <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl flex-shrink-0 group">
                                    {profile.profileImage ? (
                                        <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">
                                            <User size={40} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full">
                                    <p className="text-sm text-white/40 mb-4 font-light leading-relaxed">
                                        Upload a professional headshot. It will be compressed automatically and shown in the About section.
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full text-sm text-white/40 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-white file:text-black hover:file:bg-white/90 file:cursor-pointer transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Content */}
                <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                            <Hash size={20} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Biography & Stats</h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-xs uppercase tracking-widest text-white/30 font-bold">About Section Title</label>
                        <input
                            className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all"
                            required
                            value={profile.aboutTitle}
                            onChange={e => setProfile({ ...profile, aboutTitle: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-xs uppercase tracking-widest text-white/30 font-bold">About Description</label>
                        <textarea
                            rows={5}
                            className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all font-light leading-relaxed"
                            required
                            value={profile.aboutDescription}
                            onChange={e => setProfile({ ...profile, aboutDescription: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold">Years of Experience</label>
                            <input
                                type="number"
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all"
                                required
                                value={profile.yearsOfExperience}
                                onChange={e => setProfile({ ...profile, yearsOfExperience: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold">Projects Completed</label>
                            <input
                                type="number"
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all"
                                required
                                value={profile.projectsCompleted}
                                onChange={e => setProfile({ ...profile, projectsCompleted: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold">Happy Clients</label>
                            <input
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all"
                                required
                                value={profile.happyClients}
                                onChange={e => setProfile({ ...profile, happyClients: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact & Social Links */}
                <div className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-8">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                            <Mail size={20} />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Contact & Links</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3 md:col-span-2">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold">Primary Contact Email</label>
                            <input
                                type="email"
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all"
                                required
                                value={profile.email}
                                onChange={e => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold">LinkedIn Profile URL</label>
                            <input
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all placeholder:text-white/10"
                                placeholder="https://linkedin.com/in/username"
                                value={profile.linkedinLink}
                                onChange={e => setProfile({ ...profile, linkedinLink: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="text-xs uppercase tracking-widest text-white/30 font-bold">GitHub Profile URL</label>
                            <input
                                className="bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[var(--color-accent)] outline-none transition-all placeholder:text-white/10"
                                placeholder="https://github.com/username"
                                value={profile.githubLink}
                                onChange={e => setProfile({ ...profile, githubLink: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Sticky Action Bar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all shadow-2xl ${isLoading ? 'bg-white/20 text-white/40 cursor-wait' : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : <Save size={18} />}
                        {isLoading ? 'Processing...' : 'Save Global Changes'}
                    </button>
                </div>
            </form>

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: 'success' })}
            />
        </div>
    );
};

export default ManageProfile;
