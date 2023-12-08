const handleRegister = (req, res, connection) => {
  const { login, password, name, surname } = req.body;

  // Pobranie następnego dostępnego numeru userID
  connection.query(
    "SELECT MAX(userID) + 1 AS nextUserID FROM Users",
    (error, results) => {
      if (error) {
        console.error(
          "Błąd podczas pobierania następnego numeru userID:",
          error
        );
        res.status(500).json({ error: "Błąd rejestracji" });
      } else {
        const nextUserID = results[0].nextUserID || 0; // Jeśli nie ma jeszcze użytkowników, zaczynamy od 0

        const userInsertSQL = `
          INSERT INTO Users (UserID, Login, Password, Name, Surname)
          VALUES (?, ?, ?, ?, ?);
        `;

        connection.query(
          userInsertSQL,
          [nextUserID, login, password, name, surname],
          (error, userResults) => {
            if (error) {
              console.error(
                "Błąd podczas dodawania nowego użytkownika:",
                error
              );
              res.status(500).json({ error: "Błąd rejestracji" });
            } else {
              console.log("Nowy użytkownik dodany pomyślnie.");

              // Dodanie jednego zadania do tabeli dla nowego użytkownika
              const tasksInsertSQL = `
                INSERT INTO Tasks (UserID, TaskIndex, TaskName, ToDo, InProgress, Done) 
                VALUES (?, ?, ?, ?, ?, ?);
              `;

              // Dodanie jednego zadania do tabeli dla nowego użytkownika
              const defaultTask = {
                TaskIndex: 1,
                TaskName: "Zadania",
                ToDo: "[]",
                InProgress: "[]",
                Done: "[]",
              };

              connection.query(
                tasksInsertSQL,
                [
                  nextUserID,
                  defaultTask.TaskIndex,
                  defaultTask.TaskName,
                  defaultTask.ToDo,
                  defaultTask.InProgress,
                  defaultTask.Done,
                ],
                (error, tasksResults) => {
                  if (error) {
                    console.error(
                      "Błąd podczas dodawania nowego zadania:",
                      error
                    );
                    res.status(500).json({ error: "Błąd rejestracji" });
                  } else {
                    console.log("Nowe zadanie dodane pomyślnie.");

                    // Zwrócenie wyniku w żądanej strukturze
                    const result = {
                      id: nextUserID,
                      name,
                      surname,
                      login,
                      password,
                      tasks: [
                        {
                          taskID: tasksResults.insertId, // ID nowego zadania
                          taskName: defaultTask.TaskName,
                          ToDo: JSON.parse(defaultTask.ToDo),
                          InProgress: JSON.parse(defaultTask.InProgress),
                          Done: JSON.parse(defaultTask.Done),
                        },
                      ],
                    };

                    res.json({ message: "Rejestracja udana", user: result });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

module.exports = handleRegister;
