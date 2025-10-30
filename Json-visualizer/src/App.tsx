
import { useState } from 'react'
import './App.css'
import { placeholder } from './static-data/static-data';
import NodeTreeComponent from './components/NodeTreeComponent';
import { nodeTree } from './common-service/CommonService';
import ToggleButton from './components/ToggleComponent';


function App() {

  const [isValidJson, setIsValidJson] = useState(true);
  const [jsonText, setJsonText] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [search, setSearch] = useState('');
  const [isToggle, setIsToggle] = useState(false)

  const handleChange = (e: any) => {
    const value = e.target.value;
    setJsonText(value)
    setIsValidJson(true)

  }


  const validateJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const { nodes, edges } = nodeTree('root', parsed, 0, 50, null, { nodes: [], edges: [] }, search)
      setIsValidJson(true)
      setNodes(nodes)
      setEdges(edges)
    } catch {
      setIsValidJson(false)
    }
  }

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearch(value)
  }


  return (
    <div className={`${!isToggle ? 'container' : 'container toggle'}`}>
      <div className={`${!isToggle ? 'sub-wrapper' : 'sub-wrapper toggle'}`}>
        <div className={`${!isToggle ? 'json-input-wrapper' : 'json-input-wrapper toggle'}`}>
          <h1>JSON Tree Visualizer</h1>

          {
            (!isValidJson) && <p style={{ color: 'red', fontWeight: 500 }}>Invalid JSON</p>
          }
          <div>
            <p className={`${!isToggle ? 'sub-heading' : 'sub-heading toggle'}`}>Paste or type your JSON data </p>
            <textarea value={jsonText}
              className='textarea-box'
              rows={25}
              cols={60}
              placeholder={placeholder}
              style={{ border: !isValidJson ? '1px solid red' : '' }}
              onChange={handleChange}
            />
          </div>
          <button className='generate-tree-btn' disabled={!jsonText} onClick={validateJson}>
            Generate Tree
          </button>

        </div>
        <div className='node-tree-wrapper'>
          <div className='search-toggle-wrapper'>
            <div>
              <input type='search'
                value={search}
                className='searchbar'
                onChange={handleSearch}
                placeholder='Search Key' />
              <button className='search-btn' disabled={!search} onClick={validateJson}>
                Search
              </button>
            </div>
            <ToggleButton label='Light/Dark'
              checked={isToggle}
              className={`${isToggle ? 'toggle-text' : ''}`}
              onChange={(e: any) => setIsToggle(e.target.checked)} />
          </div>
          <NodeTreeComponent nodes={nodes}
            edges={edges}
          />
        </div>
      </div>
    </div>
  )
}

export default App
