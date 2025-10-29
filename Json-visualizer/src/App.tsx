
import { useState } from 'react'
import './App.css'
import { placeholder } from './static-data/static-data';
import NodeTreeComponent from './components/NodeTreeComponent';
import { nodeTree } from './common-service/CommonService';


function App() {

  const [isValidJson, setIsValidJson] = useState(true);
  const [jsonText, setJsonText] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setJsonText(value)
    setIsValidJson(true)

  }

  const validateJson = () => {
    try {
      const parsed = JSON.parse(jsonText)
      const { nodes, edges } = nodeTree('root', parsed)
      setIsValidJson(true)
      setNodes(nodes)
      setEdges(edges)
    } catch {
      setIsValidJson(false)
    }
  }

  return (
    <div className='container'>
      <div className='sub-wrapper'>
        <div className='json-input-wrapper'>
          <h1>JSON Tree Visualizer</h1>
          {
            (!isValidJson) && <p style={{ color: 'red', fontWeight: 500 }}>Invalid JSON</p>
          }
          <div>
            <p className='sub-heading'>Paste or type your JSON data </p>
            <textarea value={jsonText}
              className='textarea-box'
              rows={25}
              cols={60}
              placeholder={placeholder}
              style={{ border: !isValidJson ? '1px solid red' : '' }}
              onChange={handleChange}
            />
          </div>
          <button className='generate-tree-btn'  onClick={validateJson}>
            Generate Tree
          </button>

        </div>
        <div className='node-tree-wrapper'>
          <NodeTreeComponent nodes={nodes}
            edges={edges}
          />
        </div>
      </div>
    </div>
  )
}

export default App
