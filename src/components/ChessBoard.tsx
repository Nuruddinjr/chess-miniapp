/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // Use this for client-side rendering in Next.js

import React, { memo, useEffect, useState, MouseEvent } from "react";
import { Chess, Color, Move, PieceSymbol, Square } from "chess.js";
import { useRecoilState } from "recoil";
import Confetti from "react-confetti";

import {
  isBoardFlippedAtom,
  movesAtom,
  userSelectedMoveIndexAtom,
} from "@/atoms/chessBoard";
import LetterNotation from "@/components/chess-board/LetterNotation";
import LegalMoveIndicator from "@/components/chess-board/LegalMoveIndicator";
import ChessSquare from "@/components/chess-board/ChessSquare";
import NumberNotation from "@/components/chess-board/NumberNotation";
import { drawArrow } from "@/utils/canvas";

export function isPromoting(chess: Chess, from: Square, to: Square) {
  if (!from) return false;
  const piece = chess.get(from);
  if (piece?.type !== "p" || piece.color !== chess.turn()) return false;
  return (
    ["1", "8"].some((it) => to.endsWith(it)) &&
    chess
      .history({ verbose: true })
      .map((it) => it.to)
      .includes(to)
  );
}

export const ChessBoard = memo(
  ({
    gameId,
    started,
    myColor,
    chess,
    board,
    socket,
    setBoard,
  }: {
    myColor: Color;
    gameId: string;
    started: boolean;
    chess: Chess;
    setBoard: React.Dispatch<
      React.SetStateAction<
        ({
          square: Square;
          type: PieceSymbol;
          color: Color;
        } | null)[][]
      >
    >;
    board: (Array<{
      square: Square;
      type: PieceSymbol;
      color: Color;
    }> | null)[][];
    socket: WebSocket;
  }) => {
    const [isFlipped, setIsFlipped] = useRecoilState(isBoardFlippedAtom);
    const [userSelectedMoveIndex, setUserSelectedMoveIndex] = useRecoilState(
      userSelectedMoveIndexAtom
    );
    const [moves, setMoves] = useRecoilState(movesAtom);

    const [lastMove, setLastMove] = useState<{
      from: string;
      to: string;
    } | null>(null);
    const [rightClickedSquares, setRightClickedSquares] = useState<string[]>(
      []
    );
    const [arrowStart, setArrowStart] = useState<string | null>(null);
    const [from, setFrom] = useState<null | Square>(null);
    const [legalMoves, setLegalMoves] = useState<string[]>([]);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const labels = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const boxSize = 80;

    useEffect(() => {
      if (myColor === "b") setIsFlipped(true);
    }, [myColor]);

    const clearCanvas = () => {
      setRightClickedSquares([]);
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const handleMouseDown = (
      e: MouseEvent<HTMLDivElement>,
      squareRep: string
    ) => {
      e.preventDefault();
      if (e.button === 2) setArrowStart(squareRep);
    };

    const handleRightClick = (squareRep: string) => {
      setRightClickedSquares((prev) =>
        prev.includes(squareRep)
          ? prev.filter((sq) => sq !== squareRep)
          : [...prev, squareRep]
      );
    };

    const handleDrawArrow = (squareRep: string) => {
      if (arrowStart && canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx)
          drawArrow({
            ctx,
            start: arrowStart,
            end: squareRep,
            isFlipped,
            squareSize: boxSize,
          });
        setArrowStart(null);
      }
    };

    const handleMouseUp = (
      e: MouseEvent<HTMLDivElement>,
      squareRep: string
    ) => {
      e.preventDefault();
      if (e.button === 2) {
        if (arrowStart === squareRep) handleRightClick(squareRep);
        else handleDrawArrow(squareRep);
      } else clearCanvas();
    };

    useEffect(() => {
      clearCanvas();
      const lMove = moves.at(-1);
      if (lMove) setLastMove({ from: lMove.from, to: lMove.to });
      else setLastMove(null);
    }, [moves]);

    useEffect(() => {
      if (userSelectedMoveIndex !== null) {
        chess.reset();
        moves.forEach((move) => chess.move({ from: move.from, to: move.to }));
        setBoard(chess.board());
        setUserSelectedMoveIndex(null);
      } else setBoard(chess.board());
    }, [moves]);

    return (
      <>
        {gameOver && <Confetti />}
        <div className="flex relative">
          <div className="text-white-200 rounded-md overflow-hidden">
            {(isFlipped ? board.slice().reverse() : board).map((row, i) => {
              i = isFlipped ? i + 1 : 8 - i;
              return (
                <div key={i} className="flex relative">
                  <NumberNotation
                    isMainBoxColor={isFlipped ? i % 2 !== 0 : i % 2 === 0}
                    label={i.toString()}
                  />
                  {(isFlipped ? row.slice().reverse() : row).map(
                    (square, j) => {
                      j = isFlipped ? 7 - (j % 8) : j % 8;

                      const squareRepresentation = `${String.fromCharCode(
                        97 + j
                      )}${i}` as Square;

                      return (
                        <div
                          key={j}
                          style={{ width: boxSize, height: boxSize }}
                          onContextMenu={(e) => e.preventDefault()}
                          onMouseDown={(e) =>
                            handleMouseDown(e, squareRepresentation)
                          }
                          onMouseUp={(e) =>
                            handleMouseUp(e, squareRepresentation)
                          }
                        >
                          {/* ChessSquare rendering */}
                          {square && <ChessSquare square={square as any} />}
                        </div>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
          <canvas
            ref={setCanvas}
            width={boxSize * 8}
            height={boxSize * 8}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          />
        </div>
      </>
    );
  }
);
