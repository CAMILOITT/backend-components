export const notificationError = [
  {
    structure: {
      title: '',
      body: 'Cuerpo del mensaje 1',
      imageUrl: 'https://example.com/image1.jpg',
      orientation: 'vertical',
      state: 'publicado',
      time: '2022-01-01T00:00:00.000Z',
      days: [1, 3, 5],
    },
    response: {
      status: 404,
      message: 'el campo title es obligatorio',
    },
  },
  {
    structure: {
      title: 'Título 2',
      body: '',
      imageUrl: 'https://example.com/image2.jpg',
      orientation: 'horizontal',
      state: 'borrador',
      time: '2022-01-02T00:00:00.000Z',
      days: [2, 4, 6],
    },
    response: {
      status: 404,
      message: 'el campo body es obligatorio',
    },
  },
];

export const incompleteNotifications = [
  {
    structure: {
      title: 'Título 3',
      body: 'Cuerpo del mensaje 3',
      imageUrl: '',
      orientation: 'vertical',
      state: 'publicado',
      time: '2022-01-03T00:00:00.000Z',
      days: [1, 3, 5],
    },
    response: {
      status: 404,
      message: 'el campo title es obligatorio',
    },
  },
  {
    structure: {
      title: 'Título 4',
      body: 'Cuerpo del mensaje 4',
      imageUrl: 'https://example.com/image4.jpg',
      orientation: '',
      status: 'borrador',
      time: '2022-01-04T00:00:00.000Z',
      days: [2, 4, 6],
    },
    response: {
      status: 404,
      message: 'el campo title es obligatorio',
    },
  },
  {
    structure: {
      title: 'Título 5',
      body: 'Cuerpo del mensaje 5',
      imageUrl: 'https://example.com/image5.jpg',
      orientation: 'vertical',
      state: '',
      time: '2022-01-05T00:00:00.000Z',
      days: [1, 3, 5],
    },
    response: {
      status: 404,
      message: 'el campo title es obligatorio',
    },
  },
  {
    structure: {
      title: 'Título 6',
      body: 'Cuerpo del mensaje 6',
      imageUrl: 'https://example.com/image6.jpg',
      orientation: 'horizontal',
      state: 'borrador',
      time: '',
      days: [2, 4, 6],
    },
    response: {
      status: 404,
      message: 'el campo title es obligatorio',
    },
  },
  {
    structure: {
      title: 'Título 7',
      body: 'Cuerpo del mensaje 7',
      imageUrl: 'https://example.com/image7.jpg',
      orientation: 'vertical',
      state: 'publicado',
      time: '2022-01-07T00:00:00.000Z',
      days: [],
    },
    response: {
      status: 404,
      message: 'el campo title es obligatorio',
    },
  },
];

export const notification = {
  structure: {
    title: 'Título 1',
    body: 'Cuerpo del mensaje 1',
    imageUrl: 'https://example.com/image1.jpg',
    orientation: '',
    state: '',
    time: '2022-01-01T00:00:00.000Z',
    days: [1, 3, 5],
  },
  response: {
    status: 200,
    message: 'notificación creada correctamente',
  },
};
