import Editor from './components/editor/Editor';
import Explorer from './components/explorer/Explorer';

export default function App() {
  return (
    <div className='container'>
      <aside className='sidebar'>
        <Explorer/>
      </aside>

      <main className='content'>
        <Editor />
      </main>
    </div>
  );
}
