const AudioPlayer = ({ audioUrl }) => {
    return (
        <div>
            <audio controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;
