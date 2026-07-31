/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(loadedTodos => {
      setTodos(loadedTodos);
    })
      .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
              query={query}
              onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
