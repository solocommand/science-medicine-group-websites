module.exports = (schedules = []) => {
  const sections = schedules
    .filter((schedule) => schedule.section.alias.startsWith('directory') && schedule.alias !== 'directory')
    .map((schedule) => schedule.section)
    .sort((a, b) => a.name.localeCompare(b.name));
  return sections;
};
