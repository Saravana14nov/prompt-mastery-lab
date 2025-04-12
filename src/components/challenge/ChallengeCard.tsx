
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Challenge } from '@/types';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  // Function to get the difficulty color
  const getDifficultyColor = (level: 'basic' | 'intermediate' | 'advanced') => {
    switch (level) {
      case 'basic':
        return 'bg-difficulty-basic text-white';
      case 'intermediate':
        return 'bg-difficulty-intermediate text-white';
      case 'advanced':
        return 'bg-difficulty-advanced text-white';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/challenges/${challenge.id}`}>
        <div className={`h-2 w-full ${getDifficultyColor(challenge.difficulty)}`} />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <Badge className={cn('capitalize', getDifficultyColor(challenge.difficulty))}>
              {challenge.difficulty}
            </Badge>
          </div>
          <CardTitle className="mt-2">{challenge.title}</CardTitle>
          <CardDescription>{challenge.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {challenge.instructions.slice(0, 150)}...
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ChallengeCard;
