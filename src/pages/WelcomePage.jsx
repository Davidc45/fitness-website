import { useState } from 'react';

const WORKOUT_OPTIONS = [
  'Squat',
  'Bench Press',
  'Deadlift',
  'Pull-up',
  'Overhead Press',
];

export default function WelcomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState({
    type: WORKOUT_OPTIONS[0],
    customType: '',
    sets: 3,
    reps: 8,
    timer: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = e => {
    e.preventDefault();
    // decide final workout type
    const workoutType =
      form.type === 'Other'
        ? form.customType.trim() || 'Unnamed Workout'
        : form.type;

    setWorkouts(ws => [
      ...ws,
      {
        type: workoutType,
        sets: form.sets,
        reps: form.reps,
        timer: form.timer.trim() ? `${form.timer}s` : '—',
      },
    ]);

    // reset form
    setForm({
      type: WORKOUT_OPTIONS[0],
      customType: '',
      sets: 3,
      reps: 8,
      timer: '',
    });
    setShowForm(false);
  };

  const handleDelete = idx => {
    setWorkouts(ws => ws.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen p-8 bg-green-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Workouts</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {workouts.map((w, i) => (
          <div
            key={i}
            className="relative p-4 bg-white rounded-xl shadow flex flex-col"
          >
            <button
              onClick={() => handleDelete(i)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-2">{w.type}</h2>
            <p className="text-sm">Sets: {w.sets}</p>
            <p className="text-sm">Reps: {w.reps}</p>
            <p className="text-sm">Timer: {w.timer}</p>
          </div>
        ))}

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center p-4 bg-white border-2 border-dashed rounded-xl hover:border-gray-400 transition text-gray-500 text-3xl"
          >
            +
          </button>
        ) : (
          <form
            onSubmit={handleAdd}
            className="p-4 bg-white rounded-xl shadow space-y-3"
          >
            <div>
              <label className="block text-sm font-medium">Workout</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-2 py-1"
              >
                {WORKOUT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              {form.type === 'Other' && (
                <input
                  name="customType"
                  type="text"
                  placeholder="Enter workout name"
                  value={form.customType}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded px-2 py-1"
                />
              )}
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium">Sets</label>
                <input
                  name="sets"
                  type="number"
                  min="1"
                  value={form.sets}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Reps</label>
                <input
                  name="reps"
                  type="number"
                  min="1"
                  value={form.reps}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Timer (sec, optional)
              </label>
              <input
                name="timer"
                type="number"
                min="0"
                placeholder="e.g. 60"
                value={form.timer}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
