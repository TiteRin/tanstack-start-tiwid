import type {TaskFeedbackGenerator} from "@/features/tasks/domain/AddDoneTaskUseCase.ts";

export class RandomFeedbackGenerator implements TaskFeedbackGenerator {

    private messages = [
        'Amazing!',
        'Great job!',
        'Nice one!',
        'You did it!',
        'Awesome!',
        'Terrific!',
        'Congratulations!',
        'Incredible!',
        'Phenomenal!',
        'Brilliant!',
        'Fantastic!',
        'Outstanding!',
        'Impressive!',
        'Splendid!',
        'You can be proud of yourself!',
        'Crushing it!',
    ];

    generate() {

        const index = Math.floor(Math.random() * this.messages.length);
        return this.messages[index];
    }
}