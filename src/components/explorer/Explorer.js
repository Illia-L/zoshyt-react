import { useEffect, useRef, useState } from 'react';
import styles from './Explorer.module.css';

const initialData = [
  {
    id: 'root-id',
    title: 'Root Note',
    content: [
      '# Root of All Notes',
      'This is the root note containing all nested notes.',
    ],
    parentId: null,
    children: [
      '8e5f7e0d-c938-4be5-9e0b-df9cf6b5e923',
      '2b3c8f2a-939f-41eb-8bdc-1f9e3b675d56',
      'b6c9a507-1efb-4cf9-96d1-f3c1c4b9f1d6',
      '64bf6c98-c645-45b6-9836-22e7e4f84d35',
      'd435ab92-bc12-47a6-91e3-f37d8a9a0e4c',
    ],
  },
  {
    id: '8e5f7e0d-c938-4be5-9e0b-df9cf6b5e923',
    title: 'Charming sunset skies',
    content: [
      '# Charming sunset skies',
      'The evening was calm with a surreal glow over the horizon.',
    ],
    parentId: 'root-id',
    children: [
      '9e2a3f6a-7f23-4b19-b86c-c87dfbde9db2',
      'd25b91a1-4058-48b6-a334-564b7d5c0c1e',
    ],
  },
  {
    id: '9e2a3f6a-7f23-4b19-b86c-c87dfbde9db2',
    title: 'Endless ocean waves',
    content: [
      '# Endless ocean waves',
      'Waves crashed relentlessly against the rocks under a cloudy sky.',
    ],
    parentId: '8e5f7e0d-c938-4be5-9e0b-df9cf6b5e923',
    children: [],
  },
  {
    id: 'd25b91a1-4058-48b6-a334-564b7d5c0c1e',
    title: 'Golden sands beach',
    content: [
      '# Golden sands beach',
      'Golden sands stretched as far as the eye could see, warm underfoot.',
    ],
    parentId: '8e5f7e0d-c938-4be5-9e0b-df9cf6b5e923',
    children: [],
  },
  {
    id: '2b3c8f2a-939f-41eb-8bdc-1f9e3b675d56',
    title: 'Majestic mountain peaks',
    content: [
      '# Majestic mountain peaks',
      'The peaks rose tall, crowned with snow and catching early light.',
    ],
    parentId: 'root-id',
    children: [
      '83f4f9b2-bf16-4422-a39c-9c4f2a2a5c93',
      'e54f9bca-3eb9-4b4a-ae71-307f6bf9574c',
    ],
  },
  {
    id: '83f4f9b2-bf16-4422-a39c-9c4f2a2a5c93',
    title: 'Forest trail hike',
    content: [
      '# Forest trail hike',
      'Tall trees lined the path, whispering in the cool breeze.',
    ],
    parentId: '2b3c8f2a-939f-41eb-8bdc-1f9e3b675d56',
    children: [],
  },
  {
    id: 'e54f9bca-3eb9-4b4a-ae71-307f6bf9574c',
    title: 'Hidden mountain lake',
    content: [
      '# Hidden mountain lake',
      'The lake lay hidden, a mirror to the surrounding mountains.',
    ],
    parentId: '2b3c8f2a-939f-41eb-8bdc-1f9e3b675d56',
    children: [],
  },
  {
    id: 'b6c9a507-1efb-4cf9-96d1-f3c1c4b9f1d6',
    title: 'Tranquil desert night',
    content: [
      '# Tranquil desert night',
      'Stars lit up the vast, quiet desert under a clear sky.',
    ],
    parentId: 'root-id',
    children: [
      'a2d96ed8-fcdc-4297-a279-607f2b5b2874',
      'cfcaf8df-f5bb-4b3a-84d3-929a5e9c9a47',
    ],
  },
  {
    id: 'a2d96ed8-fcdc-4297-a279-607f2b5b2874',
    title: 'Campfire memories',
    content: [
      '# Campfire memories',
      'Stories and laughter filled the air as flames danced.',
    ],
    parentId: 'b6c9a507-1efb-4cf9-96d1-f3c1c4b9f1d6',
    children: [],
  },
  {
    id: 'cfcaf8df-f5bb-4b3a-84d3-929a5e9c9a47',
    title: 'Desert dawn views',
    content: [
      '# Desert dawn views',
      'The first light brought colors to the arid landscape.',
    ],
    parentId: 'b6c9a507-1efb-4cf9-96d1-f3c1c4b9f1d6',
    children: [],
  },
  {
    id: '64bf6c98-c645-45b6-9836-22e7e4f84d35',
    title: 'Ancient forest',
    content: [
      '# Ancient forest',
      'Every tree told a story, standing tall and silent.',
    ],
    parentId: 'root-id',
    children: [
      '754fdc8f-37ae-4a1f-a4f8-60b7e9d03cf2',
      '3b5f2b0e-0c9a-40b6-a1f9-3c0b6f5a9e8d',
    ],
  },
  {
    id: '754fdc8f-37ae-4a1f-a4f8-60b7e9d03cf2',
    title: 'Mystic forest path',
    content: [
      '# Mystic forest path',
      'A path wound through the trees, leading to the unknown.', //-------------------
    ],
    parentId: '64bf6c98-c645-45b6-9836-22e7e4f84d35',
    children: ['24a9d93c-0f87-4a2e-b768-c91e845f9a5d'],
  },
  {
    id: '3b5f2b0e-0c9a-40b6-a1f9-3c0b6f5a9e8d',
    title: 'Echoes of nature',
    content: [
      '# Echoes of nature',
      'Birds sang as if in conversation, filling the air with life.',
    ],
    parentId: '64bf6c98-c645-45b6-9836-22e7e4f84d35',
    children: [],
  },
  {
    id: 'd435ab92-bc12-47a6-91e3-f37d8a9a0e4c',
    title: 'City lights',
    content: [
      '# City lights',
      'Skyscrapers shone under the moon, lighting up the night.',
    ],
    parentId: 'root-id',
    children: [
      '6f68b7e5-c6c6-4b7f-a7f7-c85e7f5c7d3f',
      'b8d2aee8-d3bf-4f9f-b31e-8e7f2e3a7f5d',
    ],
  },
  {
    id: '6f68b7e5-c6c6-4b7f-a7f7-c85e7f5c7d3f',
    title: 'Urban solitude',
    content: [
      '# Urban solitude',
      'In the midst of the crowd, solitude was a silent companion.',
    ],
    parentId: 'd435ab92-bc12-47a6-91e3-f37d8a9a0e4c',
    children: [],
  },
  {
    id: 'b8d2aee8-d3bf-4f9f-b31e-8e7f2e3a7f5d',
    title: 'Nighttime reflections',
    content: [
      '# Nighttime reflections',
      "The city's lights reflected on the calm river below.",
    ],
    parentId: 'd435ab92-bc12-47a6-91e3-f37d8a9a0e4c',
    children: [],
  },
  {
    id: '11e38f7a-7c91-4b8d-887f-b19ec41d84f6',
    title: 'Hidden coral reef',
    content: [
      '# Hidden coral reef',
      'Beneath the waves lay a kaleidoscope of marine life.',
    ],
    parentId: 'd25b91a1-4058-48b6-a334-564b7d5c0c1e',
    children: ['3bdb7f5a-9f22-4389-836f-7e8bc91f32d7'],
  },
  {
    id: '3bdb7f5a-9f22-4389-836f-7e8bc91f32d7',
    title: 'Sea cave explorations',
    content: [
      '# Sea cave explorations',
      'Dark caverns with secrets carved by the ocean over millennia.',
    ],
    parentId: '11e38f7a-7c91-4b8d-887f-b19ec41d84f6',
    children: ['7f1e64c3-845d-4c49-91b3-3a2d87f1924e'],
  },
  {
    id: '7f1e64c3-845d-4c49-91b3-3a2d87f1924e',
    title: 'Ancient sea creatures',
    content: [
      '# Ancient sea creatures',
      'Fossils and remnants from another era whispered stories of the past.',
    ],
    parentId: '3bdb7f5a-9f22-4389-836f-7e8bc91f32d7',
    children: [],
  },
  {
    id: '24a9d93c-0f87-4a2e-b768-c91e845f9a5d',
    title: 'Forgotten forest village',
    content: [
      '# Forgotten forest village',
      'An ancient village hidden among towering trees.',
    ],
    parentId: '754fdc8f-37ae-4a1f-a4f8-60b7e9d03cf2',
    children: [],
  },
];

export default function Explorer() {
  const [projectId, setProjectId] = useState('root-id');
  const [docs, setDocs] = useState([]);
  // const [openedDocs, setOpenedDocs] = useState([]);
  const projectRef = useRef(null);

  function openChildren(doc) {
    const newDocs = initialData.filter(d => d.parentId === doc.id);

    setDocs(ds => [...ds, ...newDocs]);
  }

  useEffect(() => {
    const docs = initialData.filter(doc => doc.parentId === projectId);

    projectRef.current = initialData.find(doc => doc.id === projectId);

    setDocs(docs);
  }, [projectId]);

  return (
    <div className={styles.explorer}>
      <p>...</p>
      <div>
        <h3>{projectRef.current?.title}</h3>
      </div>

      <DocItemsList
        parentId={projectId}
        docs={docs}
        openChildren={openChildren}
      />
    </div>
  );
}

function DocItemsList({ docs, parentId, openChildren }) {
  console.log('parentId', parentId);
  return (
    <ul>
      {docs
        .filter(d => d.parentId === parentId)
        .map(doc => (
          <DocItem
            doc={doc}
            docs={docs}
            openChildren={openChildren}
            key={doc.id}
          />
        ))}
    </ul>
  );
}

function DocItem({ doc, docs, openChildren }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(is => !is);

    if (!docs.some(d => d.parentId === doc.id)) openChildren(doc);
  }

  return (
    <li>
      <div className={styles.titleBox}>
        <p>{doc.title}</p>
        {doc.children.length > 0 && (
          <button
            type='button'
            onClick={handleClick}
          >
            &#9654;
          </button>
        )}
      </div>

      {isOpen && (
        <DocItemsList
          docs={docs}
          openChildren={openChildren}
          parentId={doc.id}
        />
      )}
    </li>
  );
}
