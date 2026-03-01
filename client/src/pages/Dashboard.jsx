import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [interests, setInterests] = useState([]);
    const [formData, setFormData] = useState({ skillOffered: '', skillWanted: '' });
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const fetchPosts = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    }, [token]);

    const fetchInterests = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:5000/api/interests/my', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setInterests(data);
            }
        } catch (error) {
            console.error('Failed to fetch interests', error);
        }
    }, [token]);

    useEffect(() => {
        fetchPosts();
        fetchInterests();
    }, [fetchPosts, fetchInterests]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ skillOffered: '', skillWanted: '' });
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to create post', error);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                fetchPosts();
                fetchInterests(); // clear related interests
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    const handleInterest = async (postId) => {
        try {
            const res = await fetch('http://localhost:5000/api/interests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ postId }),
            });
            if (res.ok) {
                alert('Interest sent successfully!');
            } else {
                const data = await res.json();
                alert(data.message || 'Action failed');
            }
        } catch (error) {
            console.error('Failed to express interest', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-extrabold text-indigo-900 tracking-tight">SkillSwap</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-slate-600 font-medium hidden sm:block">Hello, {user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 transition duration-300 text-sm font-bold"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Post Creation & Interests */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Create Post Section */}
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Create a Post</h3>
                            <form onSubmit={handleCreatePost} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">I can teach...</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                        placeholder="e.g., React JS"
                                        value={formData.skillOffered}
                                        onChange={(e) => setFormData({ ...formData, skillOffered: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">I want to learn...</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                                        placeholder="e.g., Docker"
                                        value={formData.skillWanted}
                                        onChange={(e) => setFormData({ ...formData, skillWanted: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transform hover:-translate-y-0.5 transition duration-300"
                                >
                                    Post Request
                                </button>
                            </form>
                        </div>

                        {/* My Interests Section */}
                        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-slate-800">My Interests</h3>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">
                                    {interests.length}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {interests.length === 0 ? (
                                    <p className="text-sm text-slate-500 italic">No one has expressed interest yet.</p>
                                ) : (
                                    interests.map((interest) => (
                                        <div key={interest._id} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-sm">
                                            <p className="text-slate-700">
                                                <span className="font-bold text-indigo-900">{interest.interestedUser.name}</span> is interested in your <span className="font-semibold text-slate-900">{interest.post.skillOffered}</span> → <span className="font-semibold text-slate-900">{interest.post.skillWanted}</span> post.
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column - All Posts */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Explore Knowledge Exchange</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((post) => {
                                const isOwner = post.user._id === user?.id;

                                return (
                                    <div key={post._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                                    {post.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{post.user.name}</p>
                                                    <p className="text-xs text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            {isOwner && (
                                                <button
                                                    onClick={() => handleDeletePost(post._id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                    title="Delete Post"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            )}
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center">
                                                <span className="text-sm font-semibold text-slate-500 w-16">Offers:</span>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full ml-2">
                                                    {post.skillOffered}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-sm font-semibold text-slate-500 w-16">Wants:</span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full ml-2">
                                                    {post.skillWanted}
                                                </span>
                                            </div>
                                        </div>

                                        {!isOwner && (
                                            <button
                                                onClick={() => handleInterest(post._id)}
                                                className="w-full py-2.5 rounded-xl border-2 border-indigo-100 text-indigo-700 font-bold hover:bg-indigo-50 transition duration-300 flex items-center justify-center space-x-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                <span>I'm Interested</span>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}

                            {posts.length === 0 && (
                                <div className="md:col-span-2 py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                    <p className="text-slate-500 font-medium">No posts available yet. Be the first to start exchanging skills!</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
