import type {Meta, StoryObj} from '@storybook/react';
import {Task} from '../Task';
import {action} from '@storybook/addon-actions'


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'Todolist/Task ',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

    args: {
        task: {id: 'TaskIsNotDone', isDone: false, title: 'TaskIsNotDone'},
        editTaskTitle: action('editTaskTitle'),
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDone: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

export const TaskIsDone: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: 'TaskIsDone', isDone: true, title: 'TaskIsDone'},
    },
};


