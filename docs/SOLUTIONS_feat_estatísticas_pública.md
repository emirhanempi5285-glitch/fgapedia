## 🚀 Solution: [FEAT] Estatísticas públicas na Hero Section

This bounty requires implementing dynamic data visualization based on internal dataset analysis within the primary landing page component. The solution involves updating `Home.jsx` to perform the statistical calculations and introducing a new dedicated `StatisticsComponent` for modularity, utilizing `react-countup` for the required animation effect.

### Prerequisites

Ensure that the necessary dependencies are installed:

```bash
npm install react-countup tailwindcss # (Assuming Tailwind is already configured)
# or 
yarn add react-countup
```

---

### 📂 File Changes

#### 1. `src/components/StatisticsComponent.jsx` (New Component)

We create a dedicated component to handle the presentation and animation of the statistics, ensuring clean separation from the main page logic.

```jsx
// src/components/StatisticsComponent.jsx
import React from 'react';
import CountUp from 'react-countup';

/**
 * Reusable component to display key site statistics with animation.
 * @param {object} stats - Contains the calculated statistical values (exams, profs, subjects, courses).
 */
const StatisticsComponent = ({ stats }) => {
  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl font-semibold mb-8 text-gray-700 uppercase tracking-wider">
          Números que fazem a diferença
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">

          {/* 1. Total Exams */}
          <StatCard title="Provas" value={stats.exams} icon={<span className="text-indigo-600 mr-2">📄</span>} />

          {/* 2. Unique Professors */}
          <StatCard title="Professores" value={stats.professors} icon={<span className="text-pink-600 mr-2">👨‍🏫</span>} />

          {/* 3. Unique Subjects/Materials */}
          <StatCard title="Matérias" value={stats.subjects} icon={<span className="text-green-600 mr-2">📚</span>} />

          {/* 4. Unique Courses */}
          <StatCard title="Cursos" value={stats.courses} icon={<span className="text-yellow-600 mr-2">🎓</span>} />

        </div>
      </div>
    </section>
  );
};


// Helper component for individual stat display
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="flex items-center justify-center mb-2 text-xl">{icon}</div>
      <h3 className="text-base font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
      <CountUp start={0} end={value} duration={2} ref={el => el && React.useRef(el)} />
    </div>
  );
};

export default StatisticsComponent;
```

#### 2. `src/pages/Home.jsx` (Logic Update)

We modify the main page component to load the data, perform the complex calculations, and render the new statistics component.

*(Assuming `exams.json` is imported or available in this scope)*

```jsx
// src/pages/Home.jsx
import React from 'react';
// Assume exams data is structured like an import:
import { exams } from '../data/exams.json'; 
import StatisticsComponent from '../components/StatisticsComponent';

const Home = () => {
    /**
     * Core logic function to calculate all required statistics from the dataset.
     * @param {Array} data - The array of exam records (from exams.json).
     * @returns {object} An object containing the calculated metrics.
     */
    const calculateStats = (data) => {
        if (!data || data.length === 0) {
            return { exams: 0, professors: 0, subjects: 0, courses: 0 };
        }

        // Total Provas (Exams)
        const totalExams = data.length;

        // Unique Professors
        const uniqueProfessors = new Set(data.map(e => e.professor)).size;

        // Unique Subjects/Materials
        const uniqueSubjects = new Set(data.map(e => e.subject)).size;

        // Unique Courses
        const uniqueCourses = new Set(data.map(e => e.course)).size;

        return {
            exams: totalExams,
            professors: uniqueProfessors,
            subjects: uniqueSubjects,
            courses: uniqueCourses,
        };
    };

    // Execute the calculation when the component mounts or data changes
    const stats = calculateStats(exams);

  return (
    <div className="min-h-screen bg-white">
      {/* Existing Navbar and Hero Content */}
      <header className="py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-4 text-center pt-10">
          {/* ... Existing Title, Description, Search Bar structure goes here ... */}
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">Prepare Exames. Conquiste o Futuro.</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Acesse milhares de provas simuladas, materiais completos e acompanhamento de especialistas em todas as áreas do conhecimento.
          </p>

          {/* Search Bar Simulation */}
          <div className="max-w-md mx-auto my-10">
              <input 
                  type="text" 
                  placeholder="Buscar por matéria, curso ou professor..."
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 outline-none transition duration-150 text-lg"
              />
          </div>

          {/* START OF SOLUTION IMPLEMENTATION */}
          <StatisticsComponent stats={stats} />
          {/* END OF SOLUTION IMPLEMENTATION */}
        </div>
      </header>

      {/* Remaining page content sections (e.g., featured courses, testimonials) */}
    </div>
  );
};

export default Home;
```

---

### ✅ Verification and Testing Snippet

To confirm the implementation correctly processes the data and displays the animated metrics, you can use a dedicated test file or simply verify rendering in the component's `useEffect` hook (for local testing).

**Test Scenario:** Data Validation Check.

If `exams.json` contains 127 records:
*   Example 1: All exams are from "Physics" and taught by "Prof A".
    *   Expected Stats: Exams = 127, Professors = 1, Subjects = 1, Courses = 1.
*   Example 2: The original dataset structure (mixed data).
    *   Expected Stats: `exams.length` should accurately reflect the count of records. The `Set` operations must return the precise counts for unique professors, subjects, and courses.

**Verification Output Check:**

After running the application, the Statistics Section must be visible below the search bar, showing numbers that animate up from zero when the component mounts:

```
[Visual Output Mockup]

Números que fazem a diferença 
------------------------------

| [📄 Provas] | [👨‍🏫 Professores] | [📚 Matérias] | [🎓 Cursos] |
|-----------|-------------------|-------------|------------|
| (Animates to 127) | (Animates to 48) | (Animates to 32) | (Animates to 5) |

```