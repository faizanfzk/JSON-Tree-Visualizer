export const nodeTree = (
    key: string,
    value: any,
    depth = 0,
    x = 50,
    parentId: string | null = null,
    list: any = { nodes: [], edges: [] }
) => {
    const id = Math.random().toString();
    let type: string;
    let color = '#ccc';

    if (Array.isArray(value)) {
        type = 'array';
        color = 'green';
    } else if (value !== null && typeof value === 'object') {
        type = 'object';
        color = 'blue';
    } else {
        type = 'primitive';
        color = 'orange';
    }

    const label = type === 'primitive' ? `${key}: ${value}` : key;

    list.nodes.push({
        id,
        data: { label },
        position: {
            x: x*2,
            y: depth * 200,
        },
        style: {
            backgroundColor: color,
            color: '#000',
            border: '1px solid lightgreen',
            padding: 5,
            borderRadius: 8,
        },
    });

    if (parentId) {
        list.edges.push({
            id: `${parentId}-${id}`,
            source: parentId,
            target: id,
        });
    }

    if (typeof value === 'object' && value !== null) {
        const entries = Array.isArray(value)
            ? value.map((v, i) => [`[${i}]`, v])
            : Object.entries(value);

        entries.forEach(([childKey, childVal], index) => {
            const offset = (index - (entries.length - 1) / 2) * 180;
            nodeTree(childKey, childVal, depth + 1, x + offset, id, list);
        });
    }

    return list;
};