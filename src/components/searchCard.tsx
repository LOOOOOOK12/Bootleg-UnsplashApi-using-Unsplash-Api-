import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

type Topic = {
    id: string;
    slug: string;
    title: string;
};

type SearchCardProps = {
    topics?: Topic[]; // Ensure this matches the type expected
}

function SearchCard({ topics }: SearchCardProps) {
    return (
        <Card className='absolute left-8 top-12 w-[30rem] h-[10rem]'>
            <CardContent>
                {topics && topics.length > 0 ? (
                    topics.map((topic) => (
                        <p key={topic.id} className='text-black'>{topic.title}</p> // Render the title
                    ))
                ) : (
                    <p className='text-black'>No topics available</p>
                )}
            </CardContent>
        </Card>
    );
}

export default SearchCard;
