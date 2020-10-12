const uuid = require('uuid');
const Column = require('../columns/column.model');

class Board {
  constructor({
    id = uuid(),
    title = 'canban',
    columns = [
      {
        id: uuid(),
        title: 'Column 1',
        order: 1
      }
    ]
  }) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(
      ({ id: boardId, title: boardTitle, order }) =>
        new Column({ id: boardId, title: boardTitle, order })
    );
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
