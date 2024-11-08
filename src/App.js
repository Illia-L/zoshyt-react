import Editor from './components/editor/Editor';

export default function App() {
  return (
    <div className='container'>
      <aside className='sidebar'></aside>

      <main className='content'>
        <Editor />
      </main>
    </div>
  );
}
