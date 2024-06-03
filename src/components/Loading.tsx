
interface LoadingProps {
    text: string;
}

const Loading = ({ text }: LoadingProps) => (
    <div>
        <p className="text-md">{text}</p>
    </div>
);

Loading.defaultProps = {
    text: 'loading...',
};

export default Loading;
