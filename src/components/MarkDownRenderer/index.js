
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

const MarkdownRenderer = ({source}) => {
    return(
    <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {source}
    </Markdown>
    )
}
export default MarkdownRenderer;