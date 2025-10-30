import {
    Background,
    Controls,
    ReactFlow,

} from '@xyflow/react';
import '@xyflow/react/dist/style.css';



interface NodeTreeProps {
    nodes: any[];
    edges: any[];
}

const NodeTreeComponent = (props: NodeTreeProps) => {
    const { nodes, edges } = props;

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            >
                <Background/>
                <Controls />
            </ReactFlow>
        </div>
    )

}

export default NodeTreeComponent;