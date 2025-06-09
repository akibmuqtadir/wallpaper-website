import { useState, useContext } from 'react';
import AuthContext from '../context/auth';
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { user } = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        formData.append('category', category);
        
        try {
            const res = await axios.post('/api/wallpapers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Wallpaper uploaded successfully!');
            // Reset form
            setFile(null);
            setTitle('');
            setDescription('');
            setTags('');
            setCategory('');
        } catch (err) {
            console.error(err);
            alert('Error uploading wallpaper');
        } finally {
            setIsUploading(false);
        }
    };
    
    if (!user) {
        return <div>Please login to upload wallpapers</div>;
    }
    
    return (
        <div className="upload-container">
            <h1>Upload Wallpaper</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Wallpaper Image</label>
                    <input 
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        accept="image/*"
                        required
                    />
                </div>
                <div>
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tags (comma separated)</label>
                    <input 
                        type="text" 
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="nature">Nature</option>
                        <option value="animals">Animals</option>
                        <option value="abstract">Abstract</option>
                        <option value="technology">Technology</option>
                        <option value="space">Space</option>
                    </select>
                </div>
                <button type="submit" disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default Upload;