// Keep timing derived from order: moving a scene never leaves gaps or overlaps.
export function withTiming(scenes) {
  let cursor = 0;
  return scenes.map(scene => {
    const start = cursor;
    cursor += scene.seconds;
    return {...scene, range: [start, cursor]};
  });
}
export function moveScene(scenes, id, direction) {
  const index = scenes.findIndex(scene => scene.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= scenes.length) return scenes;
  const next = [...scenes];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
export function createScenes(seed, duration, selectedIds) {
  const ids=[...new Set(selectedIds)];
  if(!ids.length||!seed.length)return [];
  // Every selected asset gets a slot. Extras share scenes rather than disappearing.
  const buckets=seed.map(()=>[]);
  ids.forEach((id,index)=>buckets[index % seed.length].push(id));
  return seed.map((scene,index)=>({
    ...scene,
    seconds: Math.round(scene.range[1]*duration/30)-Math.round(scene.range[0]*duration/30),
    media: buckets[index].length?buckets[index]:[ids[index % ids.length]],
  }));
}
export async function contentKey(bytes) {
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), n => n.toString(16).padStart(2, '0')).join('');
}
export const formatTime = seconds => `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`;
