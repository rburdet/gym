export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
}

export interface WorkoutDay {
  id: string;
  title: string;
  description: string;
  warmup: Exercise[];
  exercises: Exercise[];
  elongation: Exercise[];
}

export const workoutRoutine: WorkoutDay[] = [
  {
    "id": "day0",
    "title": "Domingo – Recuperación activa",
    "description": "Actividad ligera y movilidad",
    "warmup": [
      {
        "name": "Caminata suave",
        "sets": 1,
        "reps": "5 min",
        "weight": ""
      },
      {
        "name": "Movilidad articular",
        "sets": 2,
        "reps": "10 repeticiones por zona",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Yoga suave",
        "sets": 1,
        "reps": "15 min",
        "weight": ""
      },
      {
        "name": "Foam rolling",
        "sets": 1,
        "reps": "5-10 min",
        "weight": ""
      },
      {
        "name": "Caminata ligera",
        "sets": 1,
        "reps": "20 min",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Full body stretch",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Deep breathing",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  },
  {
    "id": "day1",
    "title": "Lunes – Pecho y Bíceps",
    "description": "Fuerza de torso y brazos",
    "warmup": [
      {
        "name": "Jumping Jacks",
        "sets": 1,
        "reps": "2 min",
        "weight": ""
      },
      {
        "name": "Arm Circles",
        "sets": 2,
        "reps": "20 each direction",
        "weight": ""
      },
      {
        "name": "Bodyweight Squats",
        "sets": 2,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Press inclinado con mancuernas",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Press plano con mancuernas",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Aperturas en banco plano",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Flexiones",
        "sets": 3,
        "reps": "Fallo",
        "weight": ""
      },
      {
        "name": "Curl con barra",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Curl martillo con mancuernas",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Curl concentrado",
        "sets": 3,
        "reps": "10 reps por brazo",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Stretch Espalda y Piernas",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Respiración profunda",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  },
  {
    "id": "day2",
    "title": "Martes – Piernas y Tríceps",
    "description": "Fuerza de tren inferior y brazos",
    "warmup": [
      {
        "name": "Jumping Jacks",
        "sets": 1,
        "reps": "2 min",
        "weight": ""
      },
      {
        "name": "Arm Circles",
        "sets": 2,
        "reps": "20 each direction",
        "weight": ""
      },
      {
        "name": "Bodyweight Squats",
        "sets": 2,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Sentadilla con barra",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Peso muerto rumano",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Zancadas caminando",
        "sets": 3,
        "reps": "12 reps por pierna",
        "weight": ""
      },
      {
        "name": "Elevación de talones",
        "sets": 3,
        "reps": "15 reps",
        "weight": ""
      },
      {
        "name": "Fondos en banco",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Extensión de tríceps con mancuerna",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Press francés con barra",
        "sets": 3,
        "reps": "10 reps",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Stretch Espalda y Piernas",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Respiración profunda",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  },
  {
    "id": "day3",
    "title": "Miércoles – Espalda y Hombros",
    "description": "Enfocado en fuerza funcional para kitesurf",
    "warmup": [
      {
        "name": "Jumping Jacks",
        "sets": 1,
        "reps": "2 min",
        "weight": ""
      },
      {
        "name": "Arm Circles",
        "sets": 2,
        "reps": "20 each direction",
        "weight": ""
      },
      {
        "name": "Bodyweight Squats",
        "sets": 2,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Remo con barra",
        "sets": 4,
        "reps": "10-12 reps",
        "weight": ""
      },
      {
        "name": "Remo con mancuerna en banco",
        "sets": 3,
        "reps": "12 por lado",
        "weight": ""
      },
      {
        "name": "Dominadas",
        "sets": 3,
        "reps": "Fallo o 8-10 reps",
        "weight": ""
      },
      {
        "name": "Peso muerto con barra",
        "sets": 3,
        "reps": "8 reps",
        "weight": ""
      },
      {
        "name": "Press militar con barra",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Elevaciones laterales con mancuernas",
        "sets": 3,
        "reps": "15 reps",
        "weight": ""
      },
      {
        "name": "Elevaciones frontales con mancuernas",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Face pulls",
        "sets": 3,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Stretch Espalda y Piernas",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Respiración profunda",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  },
  {
    "id": "day4",
    "title": "Jueves – Pecho y Bíceps",
    "description": "Fuerza de torso y brazos",
    "warmup": [
      {
        "name": "Jumping Jacks",
        "sets": 1,
        "reps": "2 min",
        "weight": ""
      },
      {
        "name": "Arm Circles",
        "sets": 2,
        "reps": "20 each direction",
        "weight": ""
      },
      {
        "name": "Bodyweight Squats",
        "sets": 2,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Press inclinado con mancuernas",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Press plano con mancuernas",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Aperturas en banco plano",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Flexiones",
        "sets": 3,
        "reps": "Fallo",
        "weight": ""
      },
      {
        "name": "Curl con barra",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Curl martillo con mancuernas",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Curl concentrado",
        "sets": 3,
        "reps": "10 reps por brazo",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Stretch Espalda y Piernas",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Respiración profunda",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  },
  {
    "id": "day5",
    "title": "Viernes – Piernas y Tríceps",
    "description": "Fuerza de tren inferior y brazos",
    "warmup": [
      {
        "name": "Jumping Jacks",
        "sets": 1,
        "reps": "2 min",
        "weight": ""
      },
      {
        "name": "Arm Circles",
        "sets": 2,
        "reps": "20 each direction",
        "weight": ""
      },
      {
        "name": "Bodyweight Squats",
        "sets": 2,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Sentadilla con barra",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Peso muerto rumano",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Zancadas caminando",
        "sets": 3,
        "reps": "12 reps por pierna",
        "weight": ""
      },
      {
        "name": "Elevación de talones",
        "sets": 3,
        "reps": "15 reps",
        "weight": ""
      },
      {
        "name": "Fondos en banco",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Extensión de tríceps con mancuerna",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Press francés con barra",
        "sets": 3,
        "reps": "10 reps",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Stretch Espalda y Piernas",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Respiración profunda",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  },
  {
    "id": "day6",
    "title": "Sábado – Espalda y Hombros",
    "description": "Enfocado en fuerza funcional para kitesurf",
    "warmup": [
      {
        "name": "Jumping Jacks",
        "sets": 1,
        "reps": "2 min",
        "weight": ""
      },
      {
        "name": "Arm Circles",
        "sets": 2,
        "reps": "20 each direction",
        "weight": ""
      },
      {
        "name": "Bodyweight Squats",
        "sets": 2,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "exercises": [
      {
        "name": "Remo con barra",
        "sets": 4,
        "reps": "10-12 reps",
        "weight": ""
      },
      {
        "name": "Remo con mancuerna en banco",
        "sets": 3,
        "reps": "12 por lado",
        "weight": ""
      },
      {
        "name": "Dominadas",
        "sets": 3,
        "reps": "Fallo o 8-10 reps",
        "weight": ""
      },
      {
        "name": "Peso muerto con barra",
        "sets": 3,
        "reps": "8 reps",
        "weight": ""
      },
      {
        "name": "Press militar con barra",
        "sets": 4,
        "reps": "10 reps",
        "weight": ""
      },
      {
        "name": "Elevaciones laterales con mancuernas",
        "sets": 3,
        "reps": "15 reps",
        "weight": ""
      },
      {
        "name": "Elevaciones frontales con mancuernas",
        "sets": 3,
        "reps": "12 reps",
        "weight": ""
      },
      {
        "name": "Face pulls",
        "sets": 3,
        "reps": "15 reps",
        "weight": ""
      }
    ],
    "elongation": [
      {
        "name": "Stretch Espalda y Piernas",
        "sets": 1,
        "reps": "30 seg por posición"
      },
      {
        "name": "Respiración profunda",
        "sets": 1,
        "reps": "5 min"
      }
    ]
  }
]; 