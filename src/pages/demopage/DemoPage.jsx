import "./DemoPage.css"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import CommentForm from "../../components/commentform/CommentForm.jsx";
import "./DemoPage.css"
import Button from "../../components/button/Button.jsx";

function DemoPage() {
    const {id} = useParams();
    const [fileDetails, setFileDetails] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);
    const [comments, setComments] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFileDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/files/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFileDetails(response.data);
            } catch (error) {
                console.error("Fout bij het ophalen van de bestand details:", error);
            }
        };

        fetchFileDetails();
    }, [id, token]);

    useEffect(() => {
        if (fileDetails) {
            const fetchComments = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/files/${id}/comments`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setComments(response.data);
                } catch (error) {
                    console.error("Fout bij het ophalen van de comments:", error);
                }
            };

            fetchComments();
        }
    }, [fileDetails, id, token]);

    useEffect(() => {
        if (fileDetails) {
            const fetchAudioFile = async () => {
                try {
                    const audioResponse = await fetch(`http://localhost:8080/files/play/${fileDetails.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (audioResponse.ok) {
                        const audioBlob = await audioResponse.blob();
                        const audioUrl = URL.createObjectURL(audioBlob);
                        setAudioSrc(audioUrl);

                        await axios.put(`http://localhost:8080/files/playcount/${fileDetails.id}`, {}, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                    } else {
                        console.error("Fout bij het ophalen van het audiobestand.");
                    }
                } catch (error) {
                    console.error("Fout bij het ophalen van het audiobestand:", error);
                }
            };

            fetchAudioFile();
        }
    }, [fileDetails, token]);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:8080/roles/user/role', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.roleName)
                setUserRole(response.data.roleName);
            } catch (error) {
                console.error("Fout bij het ophalen van de gebruikersrol:", error);
            }
        };

        fetchUserRole();
    }, [token]);

    const handleDownload = async () => {
        try {
            // Vraag het bestand op als blob met axios
            const response = await axios.get(`http://localhost:8080/files/download/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const fileName = fileDetails.fileName + ".mp3";

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Fout bij het ophalen van het bestand voor download:", error);
        }
    };

    const handleCommentSubmit = async (commentContent) => {
        try {
            await axios.post(
                `http://localhost:8080/files/${id}/comment`,
                {content: commentContent},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const commentsResponse = await axios.get(`http://localhost:8080/files/${id}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setComments(commentsResponse.data);
        } catch (error) {
            console.error("Fout bij het toevoegen van de comment:", error);
        }
    };

    if (!fileDetails) {
        return <p>Bestand details worden geladen...</p>;
    }

    return (
        <div className="demo-container">
            <div className="demo-left-container">
                <div className="demo-info-container">
                    <h1>{fileDetails.fileName}</h1>

                    <p>{fileDetails.artistName}</p>
                    <br/><br/>
                    <p><i>{fileDetails.playCount}x bekeken</i></p>
                </div>
                <div className="demo-playback-container">
                    {audioSrc && (
                        <audio controls>
                            <source src={audioSrc} type="audio/mpeg"/>
                            Your browser does not support the audio element.
                        </audio>
                    )}
                    <Button
                        onClick={handleDownload}
                        className="download-demo-button"
                        text="Download"
                    />

                </div>
            </div>
            <div className="comment-container">

                <h2>Comments</h2>

                {userRole === 'ADMIN' && (
                    <CommentForm id={id} onCommentSubmit={handleCommentSubmit} userRole={userRole}
                                 artistName={fileDetails.artistName}/>
                )}
                {comments.length > 0 ? (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <p><strong>{comment.userName || "Onbekende artiest"}:</strong> {comment.content}</p>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Geen comments gevonden.</p>
                )}
            </div>
        </div>
    );
}

export default DemoPage;
