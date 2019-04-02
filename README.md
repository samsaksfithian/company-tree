# Company Hierarchy Tree

## Background

Most companies have a hierarchical structure: employees have managers and those managers have their own managers, etc, etc.
This can be represented by a tree structure where child nodes report to their immediate parents.

For example, if my company had the following employees:

- MacKeever
- Jeff
- Andrew, reports to Jeff
- Nicole, reports to Jeff
- Kevin, reports to Andrew
- Ivy, reports to Andrew

You could represent the hierarchy like so:

- Mackeever
- Jeff
  - Andrew
    - Kevin
    - Ivy
  - Nicole

## Task

Your task is to make an application to visualize a company's hierarchy.

A user should be able to:

1. Add new employees
   1. Input should accept Name and Reports To
   2. Make sure to handle an empty Reports To. This should create a top-level employee (they report to no one)
2. Remove an employee
   1. If removed employee has any direct reports, they should now report to the removed employee's report. For instance, if I removed Andrew from the example above my new hierarchy would be:

- Mackeever
- Jeff
  - Kevin
  - Ivy
  - Nicole

If I removed Jeff it would become:

- Mackeever
- Kevin
- Ivy
- Nicole

### Bonus 1

1. Extend your Add Employee form to accept job title and email.
2. Add a details view where a user can view name, reports to, job title, and email of selected employee

### Bonus 1.5

In the details view, show all employees that _report to_ the selected employee

### Bonus 2

Allow users to edit an employee, including their name, job title, and email

### Bonus 3

Persist your state in some kind of external database/cloud service.

## Some Things to Note

1. Think about the time complexity of assembling your tree. What is your N?
2. Order doesn't matter, so

- Kevin
- Ivy
- Nicole

Is the same as

- Nicole
- Ivy
- Kevin

3. Styling is not the most important part of this task, but make sure it looks professional and is usable. Think about principles of good design.
   1. It's ok to use a simple bulleted list for your tree, but if you want to try to make something more stylized, go for it!
4. Use Git! Track your changes and make sure you have at least one commit. For your code review I will pull the last commit from _before_ the deadline. So no cheating.
